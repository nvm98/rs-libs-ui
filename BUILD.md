# Hướng dẫn Build - rs-libs-ui

## Tổng quan
Tài liệu này hướng dẫn cách build dự án rs-libs-ui từ TypeScript/React components thành các package có thể sử dụng.

## Yêu cầu hệ thống
- Node.js >= 16
- npm >= 8
- TypeScript >= 4.5

## Cấu trúc Build

### 1. Cấu hình Build
Dự án sử dụng **Rollup** với các plugin sau:
- `@rollup/plugin-babel` - Xử lý TypeScript/JSX
- `@rollup/plugin-typescript` - Tạo type definitions
- `@rollup/plugin-node-resolve` - Resolve modules
- `@rollup/plugin-commonjs` - CommonJS support
- `rollup-plugin-peer-deps-external` - External peer dependencies

### 2. TypeScript Configuration
- `tsconfig.json` - Cấu hình chính cho development
- `tsconfig.build.json` - Cấu hình riêng cho build process

### 3. Babel Configuration
```javascript
// babel.config.js
export default {
  presets: [
    ['@babel/preset-env', { modules: false }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  exclude: 'node_modules/**',
};
```

## Các lệnh Build

### Build Production
```bash
npm run build
```
Tạo ra:
- `dist/index.js` - CommonJS format
- `dist/index.esm.js` - ES Modules format  
- `dist/index.d.ts` - TypeScript definitions

### Development Build
```bash
npm run build:dev
```
Build với sourcemap và không minify.

### Watch Mode
```bash
npm run build:watch
```
Tự động rebuild khi có thay đổi file.

## Output Structure
```
dist/
├── index.js          # CommonJS bundle
├── index.esm.js      # ES Modules bundle
├── index.d.ts        # TypeScript definitions
├── index.js.map      # Source map cho CJS
└── index.esm.js.map  # Source map cho ESM
```

## Troubleshooting

### Lỗi "Expression expected"
- Đảm bảo `@babel/preset-typescript` được cài đặt
- Kiểm tra cấu hình Babel có preset TypeScript

### Lỗi Module Resolution
- Kiểm tra `extensions` trong resolve plugin
- Đảm bảo `preferBuiltins: false` cho browser builds

### Build chậm
- Sử dụng `exclude` patterns trong TypeScript config
- Kiểm tra `include/exclude` trong babel config

## Best Practices
1. Luôn test build trước khi commit
2. Kiểm tra bundle size với `npm run analyze`
3. Verify type definitions hoạt động đúng
4. Test cả CommonJS và ES Modules formats
