import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  where, 
  getDocs,
  Timestamp,
  QuerySnapshot,
  DocumentData 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface AccessEntry {
  id?: string;
  name: string;
  role: 'student' | 'teacher' | 'guard';
  type: 'in' | 'out';
  timestamp: Date;
  enrollmentNumber?: string;
  employeeId?: string;
  guardId?: string; // ID of the guard who recorded the entry
  guardName?: string; // Name of the guard who recorded the entry
  notes?: string;
}

export interface AccessEntryInput {
  name: string;
  role: 'student' | 'teacher';
  type: 'in' | 'out';
  idNumber: string;
  notes?: string;
}

class AccessEntryService {
  private entriesCollection = collection(db, 'accessEntries');

  // Create a new access entry
  async createEntry(entryData: AccessEntryInput, guardInfo: { id: string; name: string }): Promise<boolean> {
    try {
      const entry: Omit<AccessEntry, 'id'> = {
        name: entryData.name.trim(),
        role: entryData.role,
        type: entryData.type,
        timestamp: new Date(),
        guardId: guardInfo.id,
        guardName: guardInfo.name,
        notes: entryData.notes?.trim() || '',
        ...(entryData.role === 'student' 
          ? { enrollmentNumber: entryData.idNumber.trim() }
          : { employeeId: entryData.idNumber.trim() }
        ),
      };

      await addDoc(this.entriesCollection, {
        ...entry,
        timestamp: Timestamp.fromDate(entry.timestamp),
      });

      console.log('✅ Access entry created successfully');
      return true;
    } catch (error) {
      console.error('❌ Error creating access entry:', error);
      return false;
    }
  }

  // Get entries for today
  async getTodayEntries(): Promise<AccessEntry[]> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const q = query(
        this.entriesCollection,
        where('timestamp', '>=', Timestamp.fromDate(today)),
        where('timestamp', '<', Timestamp.fromDate(tomorrow)),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const entries: AccessEntry[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        entries.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate(),
        } as AccessEntry);
      });

      return entries;
    } catch (error) {
      console.error('❌ Error fetching today entries:', error);
      return [];
    }
  }

  // Subscribe to real-time updates for today's entries
  subscribeToTodayEntries(callback: (entries: AccessEntry[]) => void): () => void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const q = query(
      this.entriesCollection,
      where('timestamp', '>=', Timestamp.fromDate(today)),
      where('timestamp', '<', Timestamp.fromDate(tomorrow)),
      orderBy('timestamp', 'desc')
    );

    return onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const entries: AccessEntry[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        entries.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate(),
        } as AccessEntry);
      });

      callback(entries);
    }, (error) => {
      console.error('❌ Error in real-time subscription:', error);
      callback([]); // Return empty array on error
    });
  }

  // Get entries by person (for checking if someone is currently inside)
  async getPersonStatus(idNumber: string, role: 'student' | 'teacher'): Promise<'in' | 'out' | 'unknown'> {
    try {
      const fieldName = role === 'student' ? 'enrollmentNumber' : 'employeeId';
      
      const q = query(
        this.entriesCollection,
        where(fieldName, '==', idNumber),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const lastEntry = querySnapshot.docs[0].data() as AccessEntry;
        return lastEntry.type;
      }
      
      return 'unknown';
    } catch (error) {
      console.error('❌ Error getting person status:', error);
      return 'unknown';
    }
  }

  // Get statistics for today
  async getTodayStats() {
    try {
      const entries = await this.getTodayEntries();
      
      const stats = {
        totalEntries: entries.length,
        studentsIn: 0,
        teachersIn: 0,
        studentsOut: 0,
        teachersOut: 0,
      };

      // Count current status by checking last entry for each person
      const peopleStatus = new Map<string, AccessEntry>();

      entries.forEach(entry => {
        const key = entry.role === 'student' ? entry.enrollmentNumber : entry.employeeId;
        if (key && (!peopleStatus.has(key) || entry.timestamp > peopleStatus.get(key)!.timestamp)) {
          peopleStatus.set(key, entry);
        }
      });

      peopleStatus.forEach(entry => {
        if (entry.role === 'student') {
          if (entry.type === 'in') stats.studentsIn++;
          else stats.studentsOut++;
        } else {
          if (entry.type === 'in') stats.teachersIn++;
          else stats.teachersOut++;
        }
      });

      return stats;
    } catch (error) {
      console.error('❌ Error calculating today stats:', error);
      return {
        totalEntries: 0,
        studentsIn: 0,
        teachersIn: 0,
        studentsOut: 0,
        teachersOut: 0,
      };
    }
  }
}

export const accessEntryService = new AccessEntryService();
export default accessEntryService;