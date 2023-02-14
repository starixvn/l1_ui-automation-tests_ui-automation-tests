# ui-automation-tests

## Coding Styles

### Use standard naming conventions

-   Use camelCase for variable and function names.
-   Use PascalCase for class names and interface names.
-   Use camelCase for interface members.
-   Use PascalCase for type names and enum names.
-   Name files with lowercase with hyphen as separated. (for example, socket-helpers.ts or socket-parser.ts)

### Use correct data type annotation ( avoid ‘any’ )

```typescript
name: string = “Hello”;
value: number = 50;
isCorrect: boolean = false;
```

### Use ‘const’ for constants

```typescript
const name = "John";
name = "Anne"; // error
const age = 30;
const age = 31; //error
const user: User = {name: "John", age: 31}; 
```

### Use ‘let’ instead of ‘var’

var is your good old friend while let came into the picture in ES6 version. let and const were introduced to reduce some drawbacks TS had with var.

```typescript
var name = "John Doe"; // global scope variable

function getAge() {
    var age = 30; // local scope variable
}
```

### Use === instead of ==

It is considered best practice to always use the former set when comparing. If two operands are of the same type and value, then === produces true and !== produces false. However, when working with == and !=, we'll run into issues when working with different types. In these cases, they'll try to coerce the values, unsuccessfully.

### Avoid unnecessary comments

Commenting is good as long as it is absolutely necessary. Always try to use intuitive names when naming variables and functions. It will reduce the necessity for you to add comments. Do not comment out source code lines.

### Use a Linter

It is important to use a lint tool if you don’t want to pollute your codebase. This is specially important when you’re working in a team. Different developers have different coding habits. Therefore a linter should be used so that all the developers unintentionally agrees to the same set of rules. When it comes to linters the go-to option is [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). It is compatible with both JavaScript and Typescript.

### Use a code formatter

Using a good code formatter ([Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) makes your coding more efficient and cleaner.

## Run tests with Docker

-   Build your docker image
    `docker build -t [image name] .`
-   Run your image with command
    `docker run --name [container name] --cpus 8 --memory 3072m -it [image name]`
