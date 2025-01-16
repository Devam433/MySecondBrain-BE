"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const contentRoute_1 = __importDefault(require("./routes/contentRoute"));
const shareLinkRoute_1 = __importDefault(require("./routes/shareLinkRoute"));
const searchTagsRoute_1 = __importDefault(require("./routes/searchTagsRoute"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/auth', authRoute_1.default);
app.use('/api/v1/content', contentRoute_1.default);
app.use('/api/v1/share', shareLinkRoute_1.default);
app.use('/api/v1', searchTagsRoute_1.default);
if (!process.env.connection_string) {
    throw new Error('Environment variable connection_string is not set');
}
mongoose_1.default.connect(process.env.connection_string).then((res) => {
    console.log('DB connected');
}).catch(err => {
    console.log('Error conneting DB');
});
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
