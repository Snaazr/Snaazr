import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, ScrollView, SafeAreaView } from 'react-native';

const NotificationScreen = () => {
  // Define state variables:
  // notifications: holds the list of notifications.
  // unreadCount: tracks the number of unread notifications.
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    /**
     * Fetch notifications from API or local storage.
     * For this example, we mock the data, but in a real-world scenario, 
     * an API call would be made here.
     * The fetched notifications are then set in the state, 
     * and unread count is updated accordingly.
     */
    const fetchNotifications = async () => {
      const fetchedNotifications = [
        { id: 1, type: 'product', message: 'New product available!', read: false },
        { id: 2, type: 'purchase', message: 'Your order is on the way!', read: false },
        { id: 3, type: 'influencer', message: 'Influencer X has a new post!', read: true },
      ];

      // Update state with fetched notifications
      setNotifications(fetchedNotifications);
      
      // Update unread notification count
      updateUnreadCount(fetchedNotifications);
    };

    fetchNotifications();
  }, []);

  /**
   * This function updates the unread count based on the notification list.
   * It filters out read notifications and counts the remaining unread notifications.
   * 
   * @param {Array} notifications - Array of notification objects.
   */
  const updateUnreadCount = (notifications) => {
    const count = notifications.filter((notification) => !notification.read).length;
    setUnreadCount(count);
  };

  /**
   * Marks a notification as read by updating the notification list in state.
   * It finds the notification by its id and sets its 'read' property to true.
   * Also, the unread count is updated after marking a notification as read.
   * 
   * @param {number} id - The id of the notification to mark as read.
   */
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  /**
   * Clears all notifications from the state and resets the unread count to zero.
   * This would typically be used when the user decides to clear the notification list.
   */
  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  /**
   * Renders individual notifications in the FlatList.
   * Each notification is displayed as a TouchableOpacity, which allows the user to 
   * mark it as read when tapped.
   * 
   * @param {Object} item - The notification object.
   * @returns {JSX.Element} - A rendered notification component.
   */
  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read ? styles.read : styles.unread]}
      onPress={() => markAsRead(item.id)}
    >
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationType}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header displaying "Notifications" and the unread count badge */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>

        {/* List of notifications */}
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotification}
        />

        {/* Display a message if there are no notifications */}
        {notifications.length === 0 ? (
          <Text style={styles.emptyText}>No new notifications</Text>
        ) : (
          <Button title="Clear Notifications" onPress={clearNotifications} color="#FF6347" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  badgeContainer: {
    backgroundColor: '#FF6347',
    borderRadius: 12,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -8,
    right: -8,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF6347',
  },
  read: {
    opacity: 0.6,
  },
  notificationMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  notificationType: {
    fontSize: 14,
    color: '#777',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
    fontSize: 16,
  },
});

export default NotificationScreen;
