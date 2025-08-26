export class Vector2 {
    x: number;
    y: number;

    static fromAngle(angle: number, length = 1) {
        return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length)
    }

    constructor(x: number, y = x) {
        this.x = x
        this.y = y
    }

    get length() {
        return Math.hypot(this.x, this.y)
    }

    get lengthSq() {
        return this.x ** 2 + this.y ** 2
    }

    get angle() {
        return Math.atan2(this.y, this.x)
    }

    set(vector: Vector2) {
        this.x = vector.x;
        this.y = vector.y;
        return this;
    }

    copy() {
        return new Vector2(this.x, this.y)
    }

    add(vector: Vector2) {
        this.x += vector.x
        this.y += vector.y
        return this
    }

    sub(vector: Vector2) {
        this.x -= vector.x
        this.y -= vector.y
        return this
    }

    mul(vector: Vector2) {
        this.x *= vector.x
        this.y *= vector.y
        return this
    }

    div(vector: Vector2) {
        this.x /= vector.x
        this.y /= vector.y
        return this
    }

    scale(scalar: number) {
        this.x *= scalar
        this.y *= scalar
        return this
    }

    lerp(vector: Vector2, amount = 0.5) {
        this.x += (vector.x - this.x) * amount
        this.y += (vector.y - this.y) * amount
        return this
    }

    moveTo(vector: Vector2, length: number) {
        const movement = vector.copy().sub(this).limit(length);

        this.x += movement.x;
        this.y += movement.y;
        return this;
    }

    norm(targetLength = 1) {
        const length = this.length
        if (this.length === 0.0) return this
        const inverseLength = targetLength / length
        this.x *= inverseLength
        this.y *= inverseLength
        return this
    }

    limit(maxLength = 1) {
        const newLength = Math.min(this.length, maxLength)
        this.norm(newLength)
        return this
    }

    floor() {
        this.x = Math.floor(this.x)
        this.y = Math.floor(this.y)
        return this
    }

    dot(vector: Vector2) {
        return this.x * vector.x + this.y * vector.y
    }

    cross(vector: Vector2) {
        return this.x * vector.y - this.y * vector.x
    }

    reflect(normal: Vector2) {
        const scalar = -2 * (this.x * normal.x + this.y * normal.y)
        this.x -= normal.x * scalar
        this.y -= normal.y * scalar
        return this
    }

    projectScalar(vector: Vector2) {
        return (this.x * vector.x + this.y * vector.y) / vector.length
    }

    project(vector: Vector2) {
        const inverseVectorLength = 1 / vector.length
        const scalar = (this.x * vector.x + this.y * vector.y) * inverseVectorLength * inverseVectorLength
        this.x = vector.x * scalar
        this.y = vector.y * scalar
        return this
    }

    rejectScalar(vector: Vector2) {
        return (this.y * vector.x - this.x * vector.y) / vector.length
    }

    reject(vector: Vector2) {
        const scalar = (this.y * vector.x - this.x * vector.y) / (vector.x * vector.x + vector.y * vector.y);
        this.x = -vector.y * scalar
        this.y = vector.x * scalar
        return this
    }

    angleBetween(vector: Vector2) {
        const cosAngle = (this.x * vector.x + this.y * vector.y) / (this.length * vector.length)
        return Math.acos(cosAngle)
    }

    rotate(angle: number) {
        const sinAngle = Math.sin(angle);
        const cosAngle = Math.cos(angle);
        const oldX = this.x;
        this.x = cosAngle * this.x - sinAngle * this.y;
        this.y = sinAngle * oldX + cosAngle * this.y;

        return this;
    }

    dist(vector: Vector2) {
        return Math.hypot(vector.x - this.x, vector.y - this.y)
    }

    distSq(vector: Vector2) {
        return (vector.x - this.x) ** 2 + (vector.y - this.y) ** 2
    }

    equalTo(vector: Vector2) {
        return this.x === vector.x && this.y === vector.y
    }

    equalToSoft(vector: Vector2, epsilon = 1e-2) {
        const differenceSum =
            Math.abs(this.x - vector.x) + Math.abs(this.y - vector.y)
        return differenceSum <= epsilon
    }
}