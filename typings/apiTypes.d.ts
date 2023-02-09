declare module "server/ServerSize" {
    enum ServerSize {
        xSmall = 1,
        small = 2,
        medium = 3,
        large = 4,
        xLarge = 5
    }
    const convertServerSize: (serverSize: ServerSize) => "t2.micro" | "t2.small" | "t2.medium" | "t2.large" | "t2.xlarg";
    export { convertServerSize };
    export default ServerSize;
}
declare module "server/dto/api.dto" {
    import ServerSize from "server/ServerSize";
    export class ApiDto {
        id: number;
        name: string;
        instanceCount: number;
        instanceSize: ServerSize;
    }
}
declare module "server/dto/create-api.dto" {
    import ServerSize from "server/ServerSize";
    export class CreateApiDto {
        name: string;
        instanceCount: number;
        instanceSize: ServerSize;
    }
}
declare module "server/dto/update-api.dto" {
    import ServerSize from "server/ServerSize";
    export class UpdateApiDto {
        id: number;
        name: string;
        instanceCount: number;
        instanceSize: ServerSize;
    }
}
declare module "user/dto/user.dto" {
    export class UserDto {
        id: number;
        email: string;
        createdAt: string;
    }
}
