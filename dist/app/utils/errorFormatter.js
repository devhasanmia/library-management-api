"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodError = void 0;
const formatZodError = (zodError) => {
    const errors = {};
    zodError.errors.forEach((issue) => {
        const path = issue.path.join('.');
        const kind = mapZodCodeToKind(issue.code);
        const params = 'params' in issue ? issue.params : {};
        errors[path] = {
            message: issue.message,
            name: "ValidatorError",
            properties: Object.assign({ message: issue.message, type: kind }, params),
            kind,
            path,
            value: 'received' in issue ? issue.received : undefined
        };
    });
    return {
        name: "ValidationError",
        errors
    };
};
exports.formatZodError = formatZodError;
const mapZodCodeToKind = (code) => {
    const mapping = {
        too_small: 'min',
        too_big: 'max',
        invalid_type: 'type',
        invalid_string: 'regex',
        invalid_date: 'date',
        custom: 'custom'
    };
    return mapping[code] || code;
};
