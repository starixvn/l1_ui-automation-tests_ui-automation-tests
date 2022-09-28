import type { WebSocket as PlaywrightWs } from "playwright-core";

export async function waitForMessage(socket: PlaywrightWs, key: string, gameName: string): Promise<any> {
    let resolve: (payload: any) => any;

    const promise = new Promise<any>((_resolve) => {
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

export function parseSocketPayload(gameName: string, payload: string): SocketPayload {
    const packetType = `42/user/${gameName.toLowerCase()},`;
    const jsonMessage = JSON.parse(payload.replace(packetType, ""));

    return { eventName: jsonMessage[0] ?? "", message: jsonMessage[1] ?? "" };
}

export type SocketPayload = {
    eventName: string;
    message: any;
};
