# Hướng dẫn Publish - rs-libs-ui

## Tổng quan
Tài liệu này hướng dẫn cách publish package rs-libs-ui lên các registry khác nhau.

## Chuẩn bị trước khi Publish

### 1. Kiểm tra Package.json
```json
{
  "name": "@your-github-username/rs-libs-ui",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### 2. Tạo .npmrc
```
@your-github-username:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 3. Build Package
```bash
npm run build
```

## Publish lên GitHub Packages

### 1. Tạo GitHub Token
1. Vào GitHub Settings → Developer settings → Personal access tokens
2. Tạo token với quyền `write:packages`, `read:packages`
3. Copy token và lưu an toàn

### 2. Authenticate
```bash
# Cách 1: Export environment variable
export GITHUB_TOKEN=your_token_here

# Cách 2: Login với npm
npm login --scope=@your-github-username --registry=https://npm.pkg.github.com
```

### 3. Publish
```bash
npm publish
```

## Publish lên NPM Registry

### 1. Cập nhật package.json
```json
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org",
    "access": "public"
  }
}
```

### 2. Login NPM
```bash
npm login
```

### 3. Publish
```bash
npm publish --access public
```

## Version Management

### Semantic Versioning
- `patch`: Bug fixes (1.0.0 → 1.0.1)
- `minor`: New features (1.0.0 → 1.1.0)  
- `major`: Breaking changes (1.0.0 → 2.0.0)

### Update Version
```bash
# Patch version
npm version patch

# Minor version
npm version minor

# Major version
npm version major

# Custom version
npm version 1.2.3
```

## Automated Publishing với GitHub Actions

### 1. Tạo .github/workflows/publish.yml
```yaml
name: Publish Package

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
      
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 2. Tạo Release
1. Vào GitHub repository
2. Releases → Create new release
3. Tag version (v1.0.0)
4. Publish release → Tự động trigger workflow

## Verification

### Kiểm tra Package đã publish
```bash
# GitHub Packages
npm view @your-github-username/rs-libs-ui

# NPM Registry  
npm view rs-libs-ui
```

### Test Installation
```bash
# Tạo project test mới
mkdir test-install && cd test-install
npm init -y
npm install @your-github-username/rs-libs-ui
```

## Troubleshooting

### 403 Forbidden
- Kiểm tra authentication token
- Verify package name không bị trùng
- Đảm bảo có quyền publish

### Package not found
- Kiểm tra registry URL trong .npmrc
- Verify package name và scope

### Build errors
- Chạy `npm run build` trước khi publish
- Kiểm tra `files` field trong package.json

## Best Practices
1. Luôn test package locally trước khi publish
2. Sử dụng semantic versioning
3. Viết changelog cho mỗi release
4. Tag git commits với version numbers
5. Backup packages quan trọng
