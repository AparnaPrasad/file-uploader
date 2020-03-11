import { ShallowWrapper } from "enzyme"

export const findByAttribute = (wrapper: ShallowWrapper, id: string) => {
    return wrapper.find(`[data-test-id="${id}"]`)
}

export function mockFile(name?: string, size?: number, mimeType?: string) {
    name = name || "mock.txt";
    size = size || 1024;
    mimeType = mimeType || 'plain/txt';

    function range(count: number) {
        var output = "";
        for (var i = 0; i < count; i++) {
            output += "a";
        }
        return output;
    }

    var blob = new File([range(size)], name, { type: mimeType });
    return blob;
};
