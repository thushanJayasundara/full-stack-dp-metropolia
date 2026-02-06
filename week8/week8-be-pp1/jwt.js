const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// Encode to Base64URL
function base64UrlEncode(data) {
    return Buffer.from(data)
        .toString("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

// Decode from Base64URL
function base64UrlDecode(encodedData) {
    const base64 = encodedData.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(base64, "base64").toString();
}


function hash(payload, secret, header) {
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    return crypto
        .createHmac("sha256", secret)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest("hex");
}

function jwtSign(payload, secret, header = { alg: "HS256", typ: "JWT" }) {
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const signature = hash(payload, secret, header);
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function jwtVerify(token, secret) {
    const [encodedHeader, encodedPayload, signature] = token.split(".");
    if (!encodedHeader || !encodedPayload || !signature) {
        return { valid: false, error: "Malformed token" };
    }
    const header = JSON.parse(base64UrlDecode(encodedHeader));
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const validSignature = hash(payload, secret, header);
    if (validSignature !== signature) {
        return { valid: false, error: "Invalid signature" };
    }
    return { valid: true, payload };
}



const header = { alg: "HS256", typ: "JWT" };
const payload = { userId: 123, userName: "R3g5T7#gh" };
const secret = "my-secret-key";

const token = jwtSign(payload, secret, header);
console.log("JWT:", token);

console.log(jwtVerify(token, secret));
// { valid: true, payload: { userId: 123, userName: "Matti" } }

// Example Usage
const payload2 = { userId: 123, exp: Math.floor(Date.now() / 1000) + 60 }; // Expires in 60 seconds
const mySecret2 = require("crypto").randomBytes(64).toString("hex"); // Strong secret
const header2 = { alg: "HS256", typ: "JWT" }; // Customizable

console.log("Generated Secret:", mySecret2);
const token2 = jwtSign(payload2, mySecret2, header2);
console.log("JWT:", token2);

// Example Usage
console.log(jwtVerify(token2, mySecret2));
// Test
const header1 = { alg: "HS256", typ: "JWT" }; // Customizable
const payload1 = { userId: 123, exp: Math.floor(Date.now() / 1000) + 60 }; // Custom payload
const secret1 = "my-secret-key";

console.log("Hash:", hash(payload1, secret1, header1));
console.log(base64UrlEncode("hello")); // aGVsbG8
console.log(base64UrlDecode("aGVsbG8")); // hello

const newToken = jwt.sign(payload, secret, { expiresIn: "1h" });
const decoded = jwt.verify(newToken, secret);
console.log(decoded);