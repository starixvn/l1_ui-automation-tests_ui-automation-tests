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

### Use ‘let’ instead of ‘var’

var is your good old friend while let came into the picture in ES6 version. let and const were introduced to reduce some drawbacks TS had with var.

```typescript
var name = "John Doe"; // global scope variable

function getAge() {
    var age = 30; // local scope variable
}
```

### Use ‘const’ for constants

```typescript
const name = "John";
name = "Anne"; // error
const age = 30;
const age = 31; //error
```

### Use === instead of ==

It is considered best practice to always use the former set when comparing. If two operands are of the same type and value, then === produces true and !== produces false. However, when working with == and !=, we'll run into issues when working with different types. In these cases, they'll try to coerce the values, unsuccessfully.

### Avoid unnecessary comments

Commenting is good as long as it is absolutely necessary. Always try to use intuitive names when naming variables and functions. It will reduce the necessity for you to add comments. Do not comment out source code lines.

## Run tests with Docker

-   Build your docker image
    `docker build -t [image name] .`
-   Run your image with command
    `docker run --name [container name] --cpus 8 --memory 3072m -it [image name]`
