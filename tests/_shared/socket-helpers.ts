import type { WebSocket as PlaywrightWs } from "playwright-core";

export async function waitForMessage(socket: PlaywrightWs, key: string, gameName: string) {
    let resolve: (payload: unknown) => void;

    const promise = new Promise((_resolve) => {
        resolve = _resolve;
    });

    socket.on("framereceived", async (msg: any) => {
        const { payload } = msg ?? "";
        const jsonMsg = parseSocketPayload(gameName, payload);

        if (payload.includes(key)) {
            resolve(jsonMsg.message);
        }
    });

    return promise;
}

export function parseSocketPayload(gameName: string, payload: string): any {
    const packetType = `42/user/${gameName.toLowerCase()},`;
    const jsonMessage = JSON.parse(payload.replace(packetType, ""));

    return { event: jsonMessage[0] ?? "", message: jsonMessage[1] ?? "" };
}
