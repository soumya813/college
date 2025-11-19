import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const TeacherTimetable = () => {
  const timetable = [
    { day: 'Monday', classes: [
      { subject: 'Mathematics', time: '9:00 AM - 10:00 AM', room: 'Room 101' },
      { subject: 'Physics', time: '11:00 AM - 12:00 PM', room: 'Room 203' },
    ]},
    { day: 'Tuesday', classes: [
      { subject: 'Chemistry', time: '10:00 AM - 11:00 AM', room: 'Lab 1' },
      { subject: 'Biology', time: '2:00 PM - 3:00 PM', room: 'Lab 2' },
    ]},
    { day: 'Wednesday', classes: [
      { subject: 'Mathematics', time: '9:00 AM - 10:00 AM', room: 'Room 101' },
      { subject: 'Physics', time: '1:00 PM - 2:00 PM', room: 'Room 203' },
    ]},
    { day: 'Thursday', classes: [
      { subject: 'Chemistry', time: '11:00 AM - 12:00 PM', room: 'Lab 1' },
      { subject: 'Biology', time: '3:00 PM - 4:00 PM', room: 'Lab 2' },
    ]},
    { day: 'Friday', classes: [
      { subject: 'Mathematics', time: '10:00 AM - 11:00 AM', room: 'Room 101' },
      { subject: 'Physics', time: '2:00 PM - 3:00 PM', room: 'Room 203' },
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
                <Text style={styles.roomText}>{class_.room}</Text>
              </View>
            </View>
          ))}
          {day.classes.length === 0 && (
            <Text style={styles.noClassText}>No classes scheduled</Text>
          )}
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
    color: '#2196F3',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
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
    backgroundColor: '#2196F3',
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
  roomText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  noClassText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default TeacherTimetable;