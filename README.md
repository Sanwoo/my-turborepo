# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from '@workspace/ui/components/button'
```

## ESLint 配置

项目使用 `eslint-config-next` 作为 Next.js 应用的 ESLint 配置，它已经包含了以下插件的推荐规则集：

- `@next/eslint-plugin-next` - Next.js 特定的 ESLint 规则
- `eslint-plugin-react` - React 的推荐规则
- `eslint-plugin-react-hooks` - React Hooks 的推荐规则

### 配置说明

- Next.js 应用的 ESLint 配置位于 `packages/eslint-config/next.js`
- 使用 `eslint-config-next` 替代了之前单独安装的三个插件，简化了配置管理
- 配置通过 `@eslint/eslintrc` 的 `FlatCompat` 兼容层适配 ESLint 9.x 的 flat config 格式
- 保留了必要的自定义规则，如 `react/react-in-jsx-scope: "off"` 和 `react/prop-types: "off"`

### 变更历史

- 移除了 `@next/eslint-plugin-next`、`eslint-plugin-react` 和 `eslint-plugin-react-hooks` 的单独依赖
- 使用 `eslint-config-next` 统一管理 Next.js、React 和 React Hooks 的 ESLint 规则

### Tailwind CSS ESLint 支持

项目已集成 `eslint-plugin-tailwindcss@^3.18.2`，用于检查 Tailwind CSS 类名的正确性和最佳实践。

- **插件版本**: `3.18.2`（兼容 Tailwind CSS v3）
- **配置位置**: `packages/eslint-config/next.js`
- **功能**:
  - 检查 Tailwind CSS 类名是否存在
  - 验证类名顺序和格式
  - 检测未使用的自定义类名
  - 提供 Tailwind CSS 最佳实践建议

## 代码格式化

项目使用 **Prettier** 进行代码格式化，并集成了 `prettier-plugin-tailwindcss` 来自动排序 Tailwind CSS 类名。

### Prettier 配置

**配置文件**: `.prettierrc.json`（项目根目录）

**格式化规则**:
- `printWidth: 200` - 每行最大字符数为 200
- `semi: false` - 不使用分号
- `singleQuote: true` - 使用单引号
- `bracketSpacing: true` - 对象括号内添加空格
- `trailingComma: "all"` - 在所有可能的地方添加尾随逗号
- `plugins: ["prettier-plugin-tailwindcss"]` - 自动排序 Tailwind CSS 类名

### Prettier 插件

- **prettier-plugin-tailwindcss@^0.7.2**: 自动按照 Tailwind CSS 推荐的顺序排序类名

### 使用方式

**格式化所有文件**:
```bash
pnpm format
```

**格式化特定文件**:
```bash
pnpm prettier --write "path/to/file"
```

**检查格式**:
```bash
pnpm prettier --check "**/*.{ts,tsx,md}"
```

### 编辑器集成

项目配置与 VS Code/Cursor 的 Prettier 扩展兼容，支持：
- 保存时自动格式化（`editor.formatOnSave: true`）
- 使用项目级别的 Prettier 配置
- 自动应用 Tailwind CSS 类名排序

## 依赖管理

项目使用 **pnpm** 作为包管理器，并通过 **pnpm catalog** 功能统一管理所有子应用的依赖包版本。

### 包管理器

- **pnpm 版本**: `10.15.0`（最新稳定版）
- 通过 `packageManager` 字段在根 `package.json` 中声明，确保所有开发者使用相同版本
- 建议使用 Corepack 或全局安装确保版本一致

### Catalog 配置

项目在 `pnpm-workspace.yaml` 中使用 `catalog` 功能统一管理**所有依赖**的版本，按功能分类组织，结构清晰：

#### 分类结构

1. **核心框架** (Core Framework)
   - `react@^19.2.1`, `react-dom@^19.2.1`, `next@^16.1.1`

2. **开发工具** (Development Tools)
   - `typescript@^5.9.3`, `eslint@^9.39.1`
   - `@eslint/eslintrc@^3.3.1`, `@eslint/js@^9.39.1`
   - `@typescript-eslint/eslint-plugin@^8.39.0`, `@typescript-eslint/parser@^8.39.0`
   - `eslint-config-next@^15.4.5`, `eslint-config-prettier@^9.1.2`
   - `eslint-plugin-only-warn@^1.1.0`, `eslint-plugin-tailwindcss@^3.18.2`, `eslint-plugin-turbo@^2.5.5`
   - `prettier-plugin-tailwindcss@^0.7.2`, `typescript-eslint@^8.39.0`

3. **类型定义** (Type Definitions)
   - `@types/node@^20.19.25`, `@types/react@^19.2.7`, `@types/react-dom@^19.2.3`

4. **UI 组件库** (UI Libraries)
   - `@radix-ui/react-slot@^1.2.3`, `lucide-react@^0.475.0`, `next-themes@^0.4.6`

5. **样式工具** (Styling Tools)
   - `tailwindcss@^3.4.17`, `autoprefixer@^10.4.20`, `tailwind-merge@^3.3.1`

6. **构建工具** (Build Tools)
   - `turbo@^2.6.3`, `@turbo/gen@^2.5.5`, `prettier@^3.7.4`

7. **工具库** (Utility Libraries)
   - `zod@^3.25.76`, `class-variance-authority@^0.7.1`, `clsx@^2.1.1`
   - `globals@^15.15.0`, `tw-animate-css@^1.3.6`

所有依赖都通过 catalog 统一管理，确保版本一致性和易于维护。

### 使用 Catalog

在子包的 `package.json` 中，使用 `catalog:` 协议引用统一管理的依赖版本：

```json
{
  "dependencies": {
    "react": "catalog:",
    "react-dom": "catalog:",
    "next": "catalog:"
  },
  "devDependencies": {
    "typescript": "catalog:",
    "eslint": "catalog:"
  }
}
```

### 版本更新

- **Next.js**: 已更新到 `v16.1.1`（最新版本）
- **Tailwind CSS**: 已从 `v4.x` 降级到 `v3.4.17`（更好的兼容性）

### 添加新的依赖

当需要添加新的依赖时：

1. **确定依赖分类**: 根据依赖的功能，确定应该属于哪个分类（核心框架、开发工具、UI 组件库等）
2. **添加到 catalog**: 在 `pnpm-workspace.yaml` 的 `catalog` 部分，按照分类添加依赖和版本
3. **在子包中引用**: 在子包的 `package.json` 中使用 `catalog:` 协议引用
4. **更新依赖**: 运行 `pnpm install` 更新依赖

**注意**: 所有依赖都应该通过 catalog 管理，即使是只在单个子包中使用的依赖，也建议添加到 catalog 中以保持一致性。

### 优势

- **版本一致性**: 确保所有子包使用相同版本的共享依赖
- **简化管理**: 只需在一个地方更新版本，所有子包自动同步
- **减少冲突**: 避免因版本不一致导致的构建或运行时问题

## Tailwind CSS 降级说明

项目已将 Tailwind CSS 从 **v4.x** 降级到 **v3.4.17**，以获得更好的兼容性和稳定性。

### 降级原因

- **兼容性**: v3.4.17 是经过充分测试的稳定版本，与现有工具链兼容性更好
- **生态系统**: v3 拥有更成熟的插件和工具支持
- **稳定性**: v4 仍处于早期阶段，可能存在未知问题

### 主要改动

#### 1. 依赖变更

**移除的依赖**:

- `@tailwindcss/postcss@^4.1.17` (v4 专用 PostCSS 插件)

**新增的依赖**:

- `autoprefixer@^10.4.20` (v3 需要，用于自动添加浏览器前缀)

#### 2. PostCSS 配置更新

**文件**: `packages/ui/postcss.config.mjs`

**变更前** (v4):

```javascript
plugins: { "@tailwindcss/postcss": {} }
```

**变更后** (v3):

```javascript
plugins: {
  tailwindcss: {},
  autoprefixer: {},
}
```

#### 3. 创建 Tailwind 配置文件

**新增文件**:

- `packages/ui/tailwind.config.ts` - UI 包的 Tailwind 配置
- `apps/web/tailwind.config.ts` - Web 应用的 Tailwind 配置（继承 UI 包配置）

**packages/ui/tailwind.config.ts** 包含：

- **content 路径配置**: 替代 v4 的 `@source` 指令

  ```typescript
  content: ['../../apps/**/*.{ts,tsx}', '../../packages/**/components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}']
  ```

- **暗色模式配置**: 替代 v4 的 `@custom-variant`

  ```typescript
  darkMode: ['class']
  ```

- **主题扩展**: 替代 v4 的 `@theme inline`，使用 CSS 变量
  ```typescript
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: {
          DEFAULT: 'var(--border)',
        },
        // ... 其他颜色配置
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
      },
    },
  }
  ```

**apps/web/tailwind.config.ts** 继承 UI 包配置：

```typescript
import uiConfig from '@workspace/ui/tailwind.config'

const config: Config = {
  ...uiConfig,
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
}
```

**注意**: 需要在 `packages/ui/package.json` 的 `exports` 中添加：

```json
"./tailwind.config": "./tailwind.config.ts"
```

#### 4. CSS 文件语法更新

**文件**: `packages/ui/src/styles/globals.css`

**主要变更**:

1. **导入顺序调整** (符合 CSS 规范):
   - `@import` 规则必须放在所有规则之前（除了 `@charset` 和 `@layer`）
   - 将 `@import 'tw-animate-css';` 移到 `@tailwind` 指令之前

2. **导入方式**:
   - **v4**: `@import "tailwindcss";`
   - **v3**:

     ```css
     @import 'tw-animate-css';

     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

3. **CSS 变量定义移到 `@layer base`**:
   - 将 `:root` 和 `.dark` 中的 CSS 变量定义移到 `@layer base` 中
   - 这是 Tailwind CSS v3 的最佳实践，确保变量在 base 层中正确定义

4. **移除 v4 专用指令**:
   - 移除 `@source` 指令（改为在 `tailwind.config.ts` 中配置 `content`）
   - 移除 `@custom-variant`（改为在 `tailwind.config.ts` 中配置 `darkMode`）
   - 移除 `@theme inline`（改为在 `tailwind.config.ts` 中配置 `theme.extend`）

5. **修复 `outline-ring/50` 语法**:
   - **v4**: `@apply outline-ring/50;` (v4 支持颜色修饰符的斜杠语法)
   - **v3**: 改为使用标准 CSS `outline` 属性：
     ```css
     *:focus-visible {
       outline-color: var(--ring);
       outline-width: 2px;
       outline-offset: 2px;
       outline-style: solid;
       opacity: 0.5;
     }
     ```

6. **修复 `border-border` 类**:
   - `border-border` 不是有效的 Tailwind 类名
   - 改为使用 CSS 变量直接设置：`border-color: var(--border);`

**最终结构**:

```css
@import 'tw-animate-css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* CSS 变量定义 */
  }
  .dark {
    /* 暗色模式变量定义 */
  }
}

@layer base {
  * {
    border-color: var(--border);
  }
  *:focus-visible {
    outline-color: var(--ring);
    outline-width: 2px;
    outline-offset: 2px;
    outline-style: solid;
    opacity: 0.5;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Tailwind v4 到 v3 的主要差异

| 特性             | v4                        | v3                                     |
| ---------------- | ------------------------- | -------------------------------------- |
| **导入方式**     | `@import "tailwindcss";`  | `@tailwind base/components/utilities;` |
| **内容路径**     | `@source` 指令在 CSS 中   | `content` 在配置文件中                 |
| **PostCSS 插件** | `@tailwindcss/postcss`    | `tailwindcss` + `autoprefixer`         |
| **主题配置**     | `@theme inline` 在 CSS 中 | `theme.extend` 在配置文件中            |
| **暗色模式**     | `@custom-variant dark`    | `darkMode: 'class'` 在配置中           |

### 迁移步骤总结

1. ✅ **更新 `pnpm-workspace.yaml`**: 移除 `@tailwindcss/postcss@^4.1.17`，添加 `autoprefixer@^10.4.20`

2. ✅ **更新 `package.json` 文件**:
   - `packages/ui/package.json`: 移除 `@tailwindcss/postcss`，添加 `autoprefixer`
   - `apps/web/package.json`: 移除 `@tailwindcss/postcss`（如果存在）
   - `packages/ui/package.json`: 在 `exports` 中添加 `"./tailwind.config": "./tailwind.config.ts"`

3. ✅ **更新 `postcss.config.mjs`**:
   - 从 `@tailwindcss/postcss` 改为标准的 `tailwindcss` 和 `autoprefixer` 插件

4. ✅ **创建 Tailwind 配置文件**:
   - `packages/ui/tailwind.config.ts`: 配置 content、darkMode 和 theme.extend
   - `apps/web/tailwind.config.ts`: 继承 UI 包配置，覆盖 content 路径

5. ✅ **更新 `globals.css`**:
   - 调整 `@import` 顺序（必须在 `@tailwind` 之前）
   - 将 CSS 变量定义移到 `@layer base` 中
   - 移除所有 v4 专用指令（`@source`、`@custom-variant`、`@theme inline`）
   - 修复 `outline-ring/50` 语法（改为标准 CSS）
   - 修复 `border-border` 类（改为 CSS 变量）

### 验证

降级完成后，请确保：

- ✅ 所有 Tailwind 类名正常工作
- ✅ 暗色模式切换正常
- ✅ 自定义颜色和主题变量正常使用
- ✅ 构建过程无错误

### 参考资源

- [Tailwind CSS v3 文档](https://tailwindcss.com/docs)
- [Tailwind CSS v3 配置指南](https://tailwindcss.com/docs/configuration)
- [从 v4 迁移到 v3](https://tailwindcss.com/docs/upgrade-guide)
# my-turborepo
