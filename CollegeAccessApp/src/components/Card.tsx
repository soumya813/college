import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, borderRadius, spacing, shadows } from '../theme';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  padding?: keyof typeof spacing;
  shadow?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  style,
  titleStyle,
  subtitleStyle,
  padding = 'md',
  shadow = true,
}) => {
  const cardStyle = [
    styles.base,
    shadow && shadows.md,
    { padding: spacing[padding] },
    style,
  ];

  return (
    <View style={cardStyle}>
      {title && (
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      )}
      {subtitle && (
        <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
});

export default Card;