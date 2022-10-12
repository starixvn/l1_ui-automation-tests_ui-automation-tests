// global.d.ts
export {};

declare global {
    namespace PlaywrightTest {
        interface Matchers<R, T> {
            toHaveApproriateBetOptions(b: Array<string>): R;
        }
    }
}
