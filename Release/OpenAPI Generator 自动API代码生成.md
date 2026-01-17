---
title: OpenAPI Generator 自动API代码生成
slug: openapi-generator-zi-dong-apidai-ma-sheng-cheng
cover: https://openapi-generator.tech/img/mono-logo.svg
categories:
  - 解决方案
  - 学习
  - 前端
  - 项目控制
tags:
  - 自动化
  - 编程工具
  - OpenAPIGenerator
halo:
  site: https://blog.glcn.top
  name: 52001ada-b231-442b-b930-2371085b4bdd
  publish: true
---
## 需求

拿到后端API接口，直接自动生成对应的API类，拿过来嘎嘎用

## 安装

这里介绍使用`OpenAPI Generator`生成`ts-fetch`的方法

有`jar`版本和`npm`版本，其实最终用的都是jar

按需选择dev安装或者global安装

```sh
npm install @openapitools/openapi-generator-cli -D
```

安装指定版本，这里提示一下Apifox的自动生成工具使用的版本是4.3.1，而最新的是7.12.0

```sh
openapi-generator-cli version-manager set 7.12.0
```

## 生成代码

先写个配置，当然也可以不用配置，但是后面参数多了，一行命令就会特别长

### 调用配置运行

使用`-c`调用配置文件，自己改路径

```sh
npx @openapitools/openapi-generator-cli generate -c ./scripts/buildOpenApiJsonConfig.json
```

### 配置示例

随便一个名字.json

```json
{  
  "generatorName": "typescript-fetch",  // 使用什么生成器
  "inputSpec": "./scripts/OpenAPI_postprocess.json",  // 后端API的OpenAPI JSON
  "outputDir": "./src/api",  // 生成目录
  "templateDir": "./scripts/ts-fetch-template",  // 模板目录
  "skipValidateSpec": true,  
  "additionalProperties": {  
    "withInterfaces": true,  // 顺便生成接口
    "nullSafeAdditionalProps": true,  // 空安全附加属性
    "supportsES6": true  
  },  
  "files": {  
    "models.Null.mustache": {  // 额外的文件
      "templateType": "SupportingFiles",  // 当作 SupportingFiles 处理
      "destinationFilename": "models/Null.ts"  // 生成到这里
    }  
  }  
}
```

## 什么是模板

就是生成器用来生成代码的模板，用`mustache`编写，节选一些片段：

```jsx
{{#withInterfaces}}  
  {{#operations}}  
    /**  
    * {{classname}} - interface  
    * {{#lambda.indented_1}}{{{unescapedDescription}}}{{/lambda.indented_1}}  
    * @export  
    * @interface {{classname}}Interface  
    */  
    export interface {{classname}}Interface {  
    {{#operation}}  
      /**  
      * {{&notes}}  
      {{#summary}}  
        * @summary {{&summary}}  
      {{/summary}}  
      {{#allParams}}  
        * @param {{=<% %>=}}{<%&dataType%>}<%={{ }}=%> {{^required}}[{{/required}}{{paramName}}{{^required}}]{{/required}} {{description}}  
      {{/allParams}}  
      * @param {*} [options] Override http request option.  
      {{#isDeprecated}}  
        * @deprecated  
      {{/isDeprecated}}  
      * @throws {RequiredError}  
      * @memberof {{classname}}Interface  
      */  
      {{nickname}}Raw({{#allParams.  
        0}}requestParameters: {{#prefixParameterInterfaces}}{{classname}}{{/prefixParameterInterfaces}}{{operationIdCamelCase}}Request, {{/allParams.0}}initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise  
      <runtime.ApiResponse  
      <{{{returnType}}}{{^returnType}}void{{/returnType}}>>;  
  
        /**  
      {{#notes}}  
          * {{&notes}}  
      {{/notes}}  
      {{#summary}}  
          * {{&summary}}  
      {{/summary}}  
      {{#isDeprecated}}  
          * @deprecated  
      {{/isDeprecated}}  
        */  
      {{^useSingleRequestParameter}}  
        {{nickname}}({{#allParams}}{{paramName}}{{^required}}  
            ?{{/required}}: {{#isEnum}}{{{datatypeWithEnum}}}{{/isEnum}}{{^isEnum}}{{{dataType}}}{{#isNullable}}  
            | null{{/isNullable}}{{/isEnum}}, {{/allParams}}initOverrides?: RequestInit | runtime.InitOverrideFunction):  
          Promise<{{{returnType}}}{{#returnType}}{{#isResponseOptional}}  
            | null | undefined {{/isResponseOptional}}{{/returnType}}{{^returnType}}void{{/returnType}}>;  
      {{/useSingleRequestParameter}}  
      {{#useSingleRequestParameter}}  
        {{nickname}}({{#allParams.0}}  
            requestParameters: {{#prefixParameterInterfaces}}{{classname}}{{/prefixParameterInterfaces}}{{operationIdCamelCase}}  
            Request, {{/allParams.0}}initOverrides?: RequestInit | runtime.InitOverrideFunction):  
          Promise<{{{returnType}}}{{#returnType}}{{#isResponseOptional}}  
            | null | undefined {{/isResponseOptional}}{{/returnType}}{{^returnType}}void{{/returnType}}>;  
      {{/useSingleRequestParameter}}  
  
    {{/operation}}  
      }  
  
  {{/operations}}  
{{/withInterfaces}}
```

看着有点复杂，不过没关系，原理就是把代码按模板要求全部格式化出来，跟`helm`这种类似

`OpenAPI JSON => mustache模板 => 对应模板的代码`

模板是可以自己修改的，可以看看官网能找到官方`ts-fetch`的模板

## 添加自己的模板

语法是`mustache`，可以看着官方的改，官网文档很多并且很复杂，因为不仅仅兼容ts，还有很多类型的代码都能生成

### 添加单个`mustache`

> https://openapi-generator.tech/docs/customization#user-defined-templates

配置里添加`files`字段，示例跟上面的差不多，这边拿出files来讲：

```json
"files": {  
    "models.Null.mustache": {  // 额外的文件
      "templateType": "SupportingFiles",  // 当作 SupportingFiles 处理
      "destinationFilename": "models/Null.ts"  // 生成到这里
    }  
}
```

#### models.Null.mustache 键名

自定义的模板名字

#### templateType

模板类型，分为：

- API
- APIDocs
- APITests
- Model
- ModelDocs
- ModelTests
- SupportingFiles

其中，这个例子的`SupportingFiles`指的是支持类文件，只会生成一次，其他的模板类型都会根据对应的需求生成多个文件，其他规则可以找上面的链接查看

#### destinationFilename

输出到的地方

## 坑

### 重复的接口或导出

`OpenAPI Generator`会按`tags`分组，如果发现自己的接口被重命名01234的话，尽量让`tags`字段只有一个成员

### 奇怪的函数名

`OpenAPI Generator`会按`operationId`生成函数名，因为`operationId`是全局唯一的
