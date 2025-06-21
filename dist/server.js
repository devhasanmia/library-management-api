"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const PORT = 5000;
const DATABASE_URL = "mongodb+srv://devhasanmia:SGtfIPYC2BNbS0nl@library-management.kssf572.mongodb.net/Library-Management?retryWrites=true&w=majority&appName=Library-Management";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(DATABASE_URL);
            console.log("Database connected successfully");
            app_1.default.listen(PORT, () => {
                console.log(`Server is running on http://localhost:${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
// DB USER: devhasanmia
// DB PASS: SGtfIPYC2BNbS0nl
