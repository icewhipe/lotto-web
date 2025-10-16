import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

interface GradientButtonProps {
  title: string;
  colors?: string[];
  iconName?: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function GradientButton({
  title,
  colors = ['#8B5CF6', '#7C3AED'],
  iconName,
  onPress,
  style,
  disabled = false,
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={colors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {iconName && <Icon name={iconName} size={20} color="#FFFFFF" />}
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
