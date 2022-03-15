"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_1 = __importDefault(require("./handler/user"));
var product_1 = __importDefault(require("./handler/product"));
var order_1 = __importDefault(require("./handler/order"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
var corsOptions = {
    origin: "http://sampleorigin.com",
    optionsSuccessStatus: 200
};
app.use((0, cors_1["default"])(corsOptions));
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello World !');
});
(0, user_1["default"])(app);
(0, product_1["default"])(app);
(0, order_1["default"])(app);
app.get('/test-cors', (0, cors_1["default"])(corsOptions), function (req, res, next) {
    res.json({ msg: 'This is CORS enabled with middleware' });
});
app.listen(3000, function () {
    console.log("Start App on ".concat(address));
});
