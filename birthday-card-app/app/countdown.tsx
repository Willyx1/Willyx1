import React, { useMemo, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

function computeCountdown(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function CountdownScreen() {
  const [date, setDate] = useState<Date>(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    d.setDate(1);
    return d;
  });
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = useMemo(() => computeCountdown(date), [tick, date]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text variant="headlineLarge" style={{ marginBottom: 8 }}>🎂 Birthday Countdown</Text>
      <Text variant="headlineMedium">{days}d {hours}h {minutes}m {seconds}s</Text>
      <Button onPress={() => setDate(new Date(Date.now() + 7 * 86400 * 1000))} style={{ marginTop: 16 }}>
        Set to +7 days
      </Button>
    </View>
  );
}