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

项目使用 **ESLint 9.x** 的 flat config 格式，所有配置都采用新的配置方式。

### 配置架构

项目采用分层 ESLint 配置架构：

1. **共享配置包** (`packages/eslint-config/`):
   - `base.js` - 基础配置，包含通用规则
   - `next.js` - Next.js 应用配置
   - `react-internal.js` - React 库配置

2. **根目录配置** (`eslint.config.js`):
   - 使用 flat config 格式（ES modules）
   - 引用 `@workspace/eslint-config/base` 作为基础配置
   - 仅应用于根目录文件，忽略 `apps/**` 和 `packages/**`

3. **子包配置**:
   - 每个子包（`apps/*` 和 `packages/*`）都有自己的 `eslint.config.js`
   - 根据包的类型引用相应的共享配置

### 配置说明

#### 根目录配置

**文件**: `eslint.config.mjs`（项目根目录）

- 使用 **flat config 格式**（ESLint 9.x 新格式）
- 使用 **ES modules** (`import/export`)
- 引用 `@workspace/eslint-config/base` 作为基础配置
- 支持 TypeScript 文件（`.ts`, `.js`）
- 忽略子包目录：`apps/**`, `packages/**`

**配置示例**:

```javascript
import { config as baseConfig } from '@workspace/eslint-config/base'

export default [
  ...baseConfig,
  {
    ignores: ['apps/**', 'packages/**', 'node_modules/**', '.next/**', 'dist/**', 'build/**', '.turbo/**'],
  },
]
```

**注意**: 使用 `.mjs` 扩展名明确指定为 ES module，避免需要在 `package.json` 中添加 `"type": "module"`。

#### Next.js 应用配置

**文件**: `packages/eslint-config/next.js`

- 使用 `eslint-config-next` 作为 Next.js 应用的 ESLint 配置
- 包含以下插件的推荐规则集：
  - `@next/eslint-plugin-next` - Next.js 特定的 ESLint 规则
  - `eslint-plugin-react` - React 的推荐规则
  - `eslint-plugin-react-hooks` - React Hooks 的推荐规则
- 配置通过 `@eslint/eslintrc` 的 `FlatCompat` 兼容层适配 ESLint 9.x 的 flat config 格式
- 保留了必要的自定义规则，如 `react/react-in-jsx-scope: "off"` 和 `react/prop-types: "off"`

### Tailwind CSS ESLint 支持

项目已集成 `eslint-plugin-tailwindcss@^3.18.2`，用于检查 Tailwind CSS 类名的正确性和最佳实践。

- **插件版本**: `3.18.2`（兼容 Tailwind CSS v3）
- **配置位置**: `packages/eslint-config/next.js`
- **功能**:
  - 检查 Tailwind CSS 类名是否存在
  - 验证类名顺序和格式
  - 检测未使用的自定义类名
  - 提供 Tailwind CSS 最佳实践建议

### 变更历史

#### ESLint 9.x Flat Config 迁移

- **迁移时间**: 2024年
- **变更内容**:
  - 将根目录的 `.eslintrc.js` 迁移到 `eslint.config.mjs`（flat config 格式）
  - 使用 ES modules 替代 CommonJS（`.mjs` 扩展名明确指定为 ES module）
  - 使用 flat config 数组格式替代旧的配置对象格式
  - 使用 `ignores` 字段替代 `ignorePatterns`
  - 引用 `@workspace/eslint-config/base` 作为基础配置
- **迁移原因**:
  - ESLint 9.x 默认使用 flat config 格式
  - 更好的性能和配置灵活性
  - 与 Turborepo monorepo 架构更兼容
  - 统一配置管理，根目录配置与子包配置保持一致

#### 历史变更

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

## Agent Skills 配置

项目已配置项目级别的 Agent Skills，用于提升 AI 辅助开发的代码质量和最佳实践。

### 已安装的 Skills

项目在 `.cursor/skills/` 和 `.agent/skills/` 目录下安装了以下 skills：

1. **vercel-react-best-practices**
   - **描述**: React 和 Next.js 性能优化指南，来自 Vercel Engineering
   - **用途**: 在编写、审查或重构 React/Next.js 代码时确保最佳性能模式
   - **触发场景**:
     - 编写新的 React 组件或 Next.js 页面
     - 实现数据获取（客户端或服务端）
     - 审查代码性能问题
     - 重构现有 React/Next.js 代码
   - **包含**: 45 条规则，涵盖 8 个类别

2. **web-design-guidelines**
   - **描述**: Web 界面指南，用于审查 UI 代码合规性
   - **用途**: 审查代码是否符合 Web 界面指南
   - **触发场景**:
     - 审查 UI 代码
     - 检查可访问性
     - 审计设计
     - 审查 UX
     - 检查网站是否符合最佳实践

### 安装位置

- **Cursor**: `.cursor/skills/`
- **Antigravity**: `.agent/skills/`

### 使用说明

这些 skills 会在以下场景自动触发：

- 当 AI 助手处理 React/Next.js 相关代码时，会自动应用性能优化最佳实践
- 当审查 UI 代码或进行设计审计时，会自动检查是否符合 Web 界面指南
- 在代码生成和重构过程中，会自动遵循这些最佳实践

### 管理 Skills

如需添加或更新 skills，可以使用：

```bash
pnpx add-skill vercel-labs/agent-skills
```

选择项目级别（Project）安装，skills 将安装到项目的 `.cursor/skills/` 和 `.agent/skills/` 目录。

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
   - `husky@^9.1.7`, `lint-staged@^16.2.7`
   - `@commitlint/cli@^20.3.1`, `@commitlint/config-conventional@^20.3.1`

3. **类型定义** (Type Definitions)
   - `@types/node@^20.19.25`, `@types/react@^19.2.7`, `@types/react-dom@^19.2.3`

4. **UI 组件库** (UI Libraries)
   - `@radix-ui/react-slot@^1.2.3`, `lucide-react@^0.475.0`, `next-themes@^0.4.6`

5. **样式工具** (Styling Tools)
   - `tailwindcss@^3.4.17`, `autoprefixer@^10.4.20`, `tailwind-merge@^3.3.1`

6. **构建工具** (Build Tools)
   - `turbo@^2.7.4`, `@turbo/gen@^2.5.5`, `prettier@^3.7.4`

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
- **Turbo**: 已从 `v2.6.3` 升级到 `v2.7.4`（使用 `@turbo/codemod` 自动升级，无需 codemod 迁移）

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

## 代码质量与提交规范

项目集成了 **Husky**、**lint-staged** 和 **commitlint**，用于在提交前自动检查代码质量和规范提交信息格式。

### Husky

**Husky** 用于管理 Git hooks，确保在提交代码前自动执行代码质量检查。

#### 配置说明

- **安装位置**: 项目根目录 `.husky/` 目录
- **初始化**: 通过 `package.json` 中的 `prepare` 脚本自动初始化
- **Hooks**:
  - `pre-commit`: 在提交前运行 `lint-staged`，对暂存文件进行格式化和检查
  - `commit-msg`: 在提交时验证 commit message 格式是否符合规范

#### Hook 文件格式

Husky hooks 文件使用简化的格式，移除了旧版本的 `#!/usr/bin/env sh` 和 `. "$(dirname -- "$0")/_/husky.sh"` 行，以兼容 Husky v10.0.0。

**示例** (`.husky/pre-commit`):

```bash
pnpm exec lint-staged
```

**示例** (`.husky/commit-msg`):

```bash
pnpm exec commitlint --edit $1
```

**注意**:

- 使用 `pnpm exec` 而不是 `pnpm dlx`，因为 `lint-staged` 和 `commitlint` 已经在 `devDependencies` 中安装
- `pnpm exec` 直接运行本地安装的包，比 `pnpm dlx`（临时下载）更快更可靠
- 不需要 `--no` 选项（这是 `npx` 的选项，`pnpm dlx` 不支持）

**注意**: 这种格式在 Husky v9 和 v10 中都可以正常工作，避免了升级时的兼容性问题。

#### 工作原理

1. 当执行 `git commit` 时，Husky 会自动触发 `pre-commit` hook
2. `pre-commit` hook 执行 `lint-staged`，对暂存的文件进行格式化（Prettier）和检查（ESLint）
3. 如果检查通过，继续执行 `commit-msg` hook 验证提交信息格式
4. 如果任何检查失败，提交将被阻止

### Lint-Staged

**lint-staged** 用于只对 Git 暂存区（staged）的文件运行 linters，提高提交效率。

#### 配置文件

**文件位置**: `package.json` 中的 `lint-staged` 字段（项目根目录）

**配置规则**:

```json
{
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": ["npx eslint --fix", "npx prettier --write"],
    "**/*.{css,scss,md,json}": ["npx prettier --write"]
  }
}
```

**注意**: 使用 `npx` 来执行命令，确保能找到正确的可执行文件（eslint 和 prettier）。

#### 处理流程

- **TypeScript/JavaScript 文件** (`*.ts`, `*.tsx`, `*.js`, `*.jsx`):
  - 运行 `eslint --fix` 自动修复可修复的问题
  - 运行 `prettier --write` 格式化代码
- **样式和文档文件** (`*.css`, `*.scss`, `*.md`, `*.json`):
  - 运行 `prettier --write` 格式化代码

#### 优势

- **只处理变更文件**: 只对暂存的文件进行检查，提高效率
- **自动修复**: ESLint 和 Prettier 会自动修复可修复的问题
- **Monorepo 支持**: 自动匹配所有子包的文件，无需额外配置
- **配置简化**: 配置直接集成在 `package.json` 中，无需单独的配置文件

#### 配置说明

根据 [lint-staged 官方文档](https://github.com/lint-staged/lint-staged?tab=readme-ov-file#configuration)，lint-staged 支持多种配置方式：

- **package.json**: 在 `package.json` 中使用 `lint-staged` 字段（推荐，当前使用）
- **独立配置文件**: `.lintstagedrc.js`、`.lintstagedrc.json` 等（已弃用）

项目选择在 `package.json` 中配置，简化项目结构，减少配置文件数量。

### Commitlint

**commitlint** 用于验证 commit message 是否符合 **Conventional Commits** 规范。

#### 配置文件

**文件位置**: `package.json` 中的 `commitlint` 字段（项目根目录）

**配置规则**:

```json
{
  "commitlint": {
    "extends": ["@commitlint/config-conventional"],
    "rules": {
      "type-enum": [2, "always", ["feat", "fix", "chore", "docs", "style", "refactor", "perf", "test"]],
      "scope-empty": [0],
      "subject-case": [2, "always", "lower-case"],
      "header-max-length": [2, "always", 100]
    }
  }
}
```

**配置说明**:

- **基础配置**: 使用 `@commitlint/config-conventional` 作为基础配置
- **类型枚举**: 支持以下提交类型：
  - `feat`: 新功能
  - `fix`: 修复 bug
  - `chore`: 构建过程或辅助工具的变动
  - `docs`: 文档变更
  - `style`: 代码格式（不影响代码运行的变动）
  - `refactor`: 重构（既不是新增功能，也不是修复 bug）
  - `perf`: 性能优化
  - `test`: 测试相关
- **Scope**: 可选，允许为空
- **Subject**: 必须小写
- **Header 长度**: 最大 100 字符

**注意**: 根据 [commitlint 官方文档](https://commitlint.js.org/reference/configuration.html#config-via-package-json)，commitlint 支持在 `package.json` 中使用 `commitlint` 字段配置，无需单独的配置文件。项目选择在 `package.json` 中配置，简化项目结构。

#### 提交信息格式

提交信息必须遵循以下格式：

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**示例**:

```bash
feat(ui): add button component
fix(web): resolve navigation issue
chore: update dependencies
docs: update README
```

#### 验证流程

1. 当执行 `git commit` 时，Husky 的 `commit-msg` hook 会被触发
2. `commit-msg` hook 执行 `commitlint --edit $1` 验证提交信息
3. 如果提交信息不符合规范，提交将被阻止并显示错误信息
4. 修改提交信息后重新提交即可

### Turborepo 集成

项目中的代码质量工具与 Turborepo 完美集成：

- **统一配置**: 所有配置都在根目录，适用于整个 monorepo
- **缓存支持**: Turborepo 可以缓存 lint 和 format 任务的结果
- **并行执行**: 在 CI/CD 环境中，Turborepo 可以并行执行多个包的检查任务

#### 相关脚本

在根 `package.json` 中：

```json
{
  "scripts": {
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "prepare": "husky install"
  }
}
```

- `pnpm lint`: 使用 Turborepo 并行执行所有子包的 lint 任务
- `pnpm format`: 格式化所有文件
- `prepare`: 在安装依赖后自动初始化 Husky

### 使用示例

#### 正常提交流程

```bash
# 1. 修改文件
git add .

# 2. 提交（会自动触发 pre-commit 和 commit-msg hooks）
git commit -m "feat(ui): add new component"

# 如果代码有格式问题，lint-staged 会自动修复并重新暂存
# 如果提交信息格式不正确，commitlint 会阻止提交
```

#### 跳过 Hooks（不推荐）

如果确实需要跳过 hooks（例如在 CI 环境中），可以使用：

```bash
git commit --no-verify -m "message"
```

**注意**: 仅在特殊情况下使用，正常情况下应遵循代码质量检查。

### 依赖版本

项目使用以下版本的工具：

- **husky**: `^9.1.7` - Git hooks 管理工具
- **lint-staged**: `^16.2.7` - 暂存文件检查工具
- **@commitlint/cli**: `^20.3.1` - Commitlint 命令行工具
- **@commitlint/config-conventional**: `^20.3.1` - Conventional Commits 规范配置

所有依赖都通过 pnpm catalog 统一管理，确保版本一致性。

### 注意事项

1. **首次使用**: 克隆项目后，运行 `pnpm install` 会自动执行 `prepare` 脚本初始化 Husky
2. **权限问题**: 如果 hooks 无法执行，确保 `.husky/` 目录下的文件具有可执行权限
3. **性能优化**: lint-staged 只处理暂存文件，不会影响整个项目的检查性能
4. **团队协作**: 所有团队成员都应遵循相同的提交规范，确保项目历史记录的一致性

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
