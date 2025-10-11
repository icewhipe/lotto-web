# 🛠️ Development Guide - iOS App

## 🚀 Quick Start

### Prerequisites
```bash
# Install Node.js (v18+)
# Install Expo CLI
npm install -g expo-cli

# Install iOS Simulator (Xcode)
xcode-select --install
```

### Setup
```bash
cd mobile
npm install
npm start
```

### Run
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Expo Go (Physical Device)
npm start
# Scan QR code in Expo Go app
```

---

## 📱 Development Workflow

### 1. Создание нового экрана
```tsx
// src/screens/NewScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewScreen() {
  return (
    <View style={styles.container}>
      <Text>New Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});
```

### 2. Добавление в навигацию
```tsx
// App.tsx или Navigator
<Tab.Screen 
  name="NewScreen" 
  component={NewScreen}
  options={{ tabBarLabel: 'Новое' }}
/>
```

### 3. Подключение к API
```tsx
import { studentAPI } from '../services/api';

const fetchData = async () => {
  try {
    const data = await studentAPI.getDashboard();
    setData(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 🎨 Styling Best Practices

### 1. Use StyleSheet.create()
```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 16,
    color: colors.text.primary,
  },
});
```

### 2. Use Theme Colors
```tsx
import { colors } from '../theme/colors';

style={{ backgroundColor: colors.primary[500] }}
```

### 3. Responsive Design
```tsx
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 2 колонки с отступами
```

---

## ⚡ Performance Optimization

### 1. FlatList вместо ScrollView
```tsx
<FlatList
  data={items}
  renderItem={({ item }) => <Item data={item} />}
  keyExtractor={item => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
/>
```

### 2. React.memo для компонентов
```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <View>...</View>;
});
```

### 3. useMemo и useCallback
```tsx
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);

const handlePress = useCallback(() => {
  console.log('Pressed');
}, []);
```

### 4. Native Driver для анимаций
```tsx
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true, // ✅ Important!
}).start();
```

---

## 🐛 Debugging

### React Native Debugger
```bash
# Install
brew install --cask react-native-debugger

# Run
open "rndebugger://set-debugger-loc?host=localhost&port=19000"
```

### Console Logs
```typescript
console.log('📱 Data:', data);
console.warn('⚠️ Warning:', message);
console.error('❌ Error:', error);
```

### Reactotron (Advanced)
```bash
npm install --save-dev reactotron-react-native
```

---

## 🧪 Testing

### Jest + React Native Testing Library
```bash
npm install --save-dev @testing-library/react-native jest
```

### Example Test
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<LoginScreen />);
    expect(getByText('Войти')).toBeTruthy();
  });

  it('handles login', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@lptt.ru');
    fireEvent.changeText(getByPlaceholderText('Пароль'), '123456');
    fireEvent.press(getByText('Войти'));
    
    // assertions
  });
});
```

---

## 📦 Build & Deploy

### Development Build
```bash
expo build:ios --type simulator
```

### Production Build
```bash
expo build:ios --type archive
```

### Upload to App Store
```bash
expo upload:ios
```

---

## 🔧 Configuration

### Environment Variables
```bash
# Create .env file
API_BASE_URL=https://api.lptt.ru
API_TIMEOUT=10000
```

### Access in code
```typescript
import Constants from 'expo-constants';

const API_URL = Constants.manifest?.extra?.apiUrl || 'http://localhost:5000';
```

---

## 🎨 Design Tokens

### Spacing
```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

### Typography
```typescript
export const typography = {
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 28, fontWeight: 'bold' },
  h3: { fontSize: 24, fontWeight: 'bold' },
  body: { fontSize: 16, fontWeight: 'normal' },
  caption: { fontSize: 13, fontWeight: 'normal' },
};
```

### Border Radius
```typescript
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
```

---

## 🔌 API Integration Checklist

- [ ] Setup axios instance
- [ ] Add interceptors (auth token)
- [ ] Error handling
- [ ] Retry logic
- [ ] Offline support
- [ ] Cache management
- [ ] Loading states
- [ ] Error states

---

## 📚 Resources

### Documentation
- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)

### Libraries
- [Ionicons](https://ionic.io/ionicons)
- [React Native Animatable](https://github.com/oblador/react-native-animatable)
- [Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)

### Tools
- [Expo Snack](https://snack.expo.dev/) - Online playground
- [React Native Directory](https://reactnative.directory/) - Libraries
- [Can I Use](https://caniuse.com/) - Browser support

---

## 🎯 Development Tips

### 1. Hot Reload
- Shake device или ⌘D (iOS) / ⌘M (Android)
- Enable Fast Refresh
- Use console.log для debugging

### 2. Component Structure
```
Component/
├── index.tsx          # Main component
├── styles.ts          # Styles
├── types.ts           # TypeScript types
└── Component.test.tsx # Tests
```

### 3. State Management
```tsx
// Local state
const [data, setData] = useState([]);

// Global state (Context API)
const { user } = useAuth();

// Server state (React Query)
const { data, isLoading } = useQuery('grades', fetchGrades);
```

---

## 🐛 Common Issues

### 1. Metro Bundler Cache
```bash
expo start -c
# or
watchman watch-del-all
rm -rf node_modules
npm install
```

### 2. iOS Build Fails
```bash
cd ios
pod install
cd ..
npm run ios
```

### 3. TypeScript Errors
```bash
npx tsc --noEmit
```

---

## 📊 Performance Monitoring

### Using React DevTools
```bash
npm install -g react-devtools
react-devtools
```

### Profiler
```tsx
import { Profiler } from 'react';

<Profiler id="Dashboard" onRender={onRenderCallback}>
  <Dashboard />
</Profiler>
```

---

## ✅ Code Quality

### ESLint
```bash
npm install --save-dev eslint @react-native-community/eslint-config
```

### Prettier
```bash
npm install --save-dev prettier
```

### TypeScript Strict Mode
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

**Happy Coding! 🚀**
