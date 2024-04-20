export class HelperService {
    getEnumKeyByEnumValue(myEnum: any, enumValue: any): string {
        let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
        return keys.length > 0 ? keys[0] : '';
    }

    getEnumKeysArray(myEnum: any): number[] {
        return Object.keys(myEnum)
            .filter((f) => !isNaN(Number(f)))
            .map((key) => parseInt(key));
    }
}
