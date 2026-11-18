import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  // Save serialized JSON data
  static async saveData(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Storage Save Error:', error);
    }
  }

  // Retrieve and parse JSON data
  static async loadData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Storage Load Error:', error);
      return null;
    }
  }
}