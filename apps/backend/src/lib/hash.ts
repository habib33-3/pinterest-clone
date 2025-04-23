import * as argon2 from "argon2";

export const hashData = async (data: string) => {
    return argon2.hash(data);
};

export const compareHashData = async (hashedData: string, plainData: string) => {
    return argon2.verify(hashedData, plainData);
};
