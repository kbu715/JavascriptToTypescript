## 자바스크립트 코드에 타입스크립트를 적용할 때 주의할 점

- 기능적인 변경은 절대 하지 않는다.
- 테스트 코드가 있을 때 타입스크립트를 적용한다. (없을땐 적용하지 않을 것)
- 처음부터 타입을 엄격하게 적용하지 않을 것 (점진적으로 STRICT 레벨을 증가)

## 자바스크립트 프로젝트에 타입스크립트 적용하기

1. 타입스크립트의 기본 환경 구성
    - NPM 초기화
    - 타입스크립트 라이브러리 설치
    - 타입스크립트 설정 파일 생성 및 기본 값 추가
    - 자바스크립트 파일을 타입스크립트 파일로 변환
    - `tsc` 명령어로 타입스크립트 컴파일하기

> Tip
> 타입 에러와 런타임 에러는 독립적인 관계 ( 타입 에러만 나면 웹서비스 구동하는데에는 문제 없다 )

2. 명시적인 `any` 선언하기
    - `tsconfig.json` 파일에 `noImplicitAny` 값을 `true`로 추가
    - 가능한 타입을 적용할 수 있는 모든 곳에 타입을 적용한다
        - 라이브러리를 쓰는 경우 DefinitelyTyped에서 @types 관련 라이브러리를 찾아 설치한다.
        - 테스트 코드가 통과하는지 확인

3. strict 모드 설정

```
{
    "strict": true,
    "strictNullChecks": true, 
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
}
```

- any로 되어있는 타입을 최대한 더 적절한 타입으로 변환.
- as와 같은 키워드를 최대한 사용하지 않도록 고민해서 변경한다.


**"strictNullChecks": true**
When strictNullChecks is true, null and undefined have their own distinct types and you’ll get a type error if you try to use them where a concrete value is expected.

**"strictFunctionTypes": true**

example)
```
function fn(x: string) {
  console.log("Hello, " + x.toLowerCase());
}

type StringOrNumberFunc = (ns: string | number) => void;

// Unsafe assignment is prevented
let func: StringOrNumberFunc = fn;
Type '(x: string) => void' is not assignable to type 'StringOrNumberFunc'.
  Types of parameters 'x' and 'ns' are incompatible.
    Type 'string | number' is not assignable to type 'string'.
      Type 'number' is not assignable to type 'string'.
```
**"strictPropertyInitialization": true**
When set to true, TypeScript will raise an error when a class property was declared but not set in the constructor.

**"noImplicitThis": true**
Raise error on ‘this’ expressions with an implied ‘any’ type.

**"strictBindCallApply": true**
When set, TypeScript will check that the built-in methods of functions call, bind, and apply are invoked with correct argument for the underlying function: