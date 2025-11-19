import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const StudentTimetable = () => {
  const timetable = [
    { day: 'Monday', classes: [
      { subject: 'Mathematics', time: '9:00 AM - 10:00 AM', room: 'Room 101', teacher: 'Prof. Johnson' },
      { subject: 'Physics', time: '11:00 AM - 12:00 PM', room: 'Room 203', teacher: 'Dr. Smith' },
      { subject: 'Chemistry', time: '2:00 PM - 3:00 PM', room: 'Lab 1', teacher: 'Prof. Brown' },
    ]},
    { day: 'Tuesday', classes: [
      { subject: 'Biology', time: '10:00 AM - 11:00 AM', room: 'Lab 2', teacher: 'Dr. Wilson' },
      { subject: 'English', time: '1:00 PM - 2:00 PM', room: 'Room 105', teacher: 'Ms. Davis' },
      { subject: 'History', time: '3:00 PM - 4:00 PM', room: 'Room 107', teacher: 'Mr. Taylor' },
    ]},
    { day: 'Wednesday', classes: [
      { subject: 'Mathematics', time: '9:00 AM - 10:00 AM', room: 'Room 101', teacher: 'Prof. Johnson' },
      { subject: 'Computer Science', time: '11:00 AM - 12:00 PM', room: 'Lab 3', teacher: 'Dr. Anderson' },
      { subject: 'Physics', time: '2:00 PM - 3:00 PM', room: 'Room 203', teacher: 'Dr. Smith' },
    ]},
    { day: 'Thursday', classes: [
      { subject: 'Chemistry', time: '10:00 AM - 11:00 AM', room: 'Lab 1', teacher: 'Prof. Brown' },
      { subject: 'Biology', time: '1:00 PM - 2:00 PM', room: 'Lab 2', teacher: 'Dr. Wilson' },
      { subject: 'English', time: '3:00 PM - 4:00 PM', room: 'Room 105', teacher: 'Ms. Davis' },
    ]},
    { day: 'Friday', classes: [
      { subject: 'Mathematics', time: '9:00 AM - 10:00 AM', room: 'Room 101', teacher: 'Prof. Johnson' },
      { subject: 'Computer Science', time: '11:00 AM - 12:00 PM', room: 'Lab 3', teacher: 'Dr. Anderson' },
      { subject: 'History', time: '2:00 PM - 3:00 PM', room: 'Room 107', teacher: 'Mr. Taylor' },
    ]},
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weekly Timetable</Text>
      
      {timetable.map((day, dayIndex) => (
        <View key={dayIndex} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day.day}</Text>
          {day.classes.map((class_, classIndex) => (
            <View key={classIndex} style={styles.classCard}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{class_.time}</Text>
              </View>
              <View style={styles.classDetails}>
                <Text style={styles.subjectText}>{class_.subject}</Text>
                <Text style={styles.teacherText}>{class_.teacher}</Text>
                <Text style={styles.roomText}>{class_.room}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  dayContainer: {
    marginBottom: 24,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  classDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  teacherText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  roomText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});

export default StudentTimetable;