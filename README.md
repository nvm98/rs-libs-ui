# rs-libs-ui

React component library được xây dựng với Shopify Polaris, tối ưu cho các ứng dụng ecommerce và quản lý.

## 🚀 Tính năng

- ✅ **Email Template Editor** - Trình soạn thảo email template với drag & drop
- ✅ **Shopify Polaris Integration** - Sử dụng design system của Shopify
- ✅ **TypeScript Support** - Type safety và IntelliSense
- ✅ **Tree Shaking** - Chỉ import components cần thiết
- ✅ **Multiple Formats** - CommonJS và ES Modules

## 📦 Cài đặt

### NPM Registry
```bash
npm install @your-github-username/rs-libs-ui
```

### GitHub Packages
```bash
npm install @your-github-username/rs-libs-ui --registry=https://npm.pkg.github.com
```

## 🛠️ Sử dụng

```typescript
import { EmailEditor, EmailTemplate } from '@your-github-username/rs-libs-ui';

function App() {
  return (
    <div>
      <EmailEditor
        onSave={(template) => console.log(template)}
        initialTemplate={myTemplate}
      />
    </div>
  );
}
```

## 📚 Tài liệu

- **[BUILD.md](./BUILD.md)** - Hướng dẫn build dự án từ source code
- **[PUBLISH.md](./PUBLISH.md)** - Hướng dẫn publish package lên registry
- **[LINKING.md](./LINKING.md)** - Hướng dẫn link package cho development

## 🏗️ Development

### Prerequisites
- Node.js >= 16
- npm >= 8

### Setup
```bash
git clone https://github.com/your-username/rs-libs-ui.git
cd rs-libs-ui
npm install
```

### Build
```bash
npm run build
```

### Development với Link
```bash
# Build và link package
npm run build
npm link

# Trong dự án consumer
npm link @your-github-username/rs-libs-ui
```

## 🧪 Testing

```bash
npm test
```

## 📋 Scripts

- `npm run build` - Build production
- `npm run build:watch` - Build với watch mode
- `npm run test` - Chạy tests
- `npm run lint` - Lint code
- `npm run storybook` - Chạy Storybook

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

MIT License - xem [LICENSE](LICENSE) để biết thêm chi tiết.

## 🆘 Suppo[object Object]ocumentation](./docs/)
- 🐛 [Issues](https://github.com/your-username/rs-libs-ui/issues)
- 💬 [Discussions](https://github.com/your-username/rs-libs-ui/discussions)