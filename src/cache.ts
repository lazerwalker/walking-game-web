import { v4 as uuidv4 } from 'uuid';

export function getUuid(): string {
    const UuidKey = "uuid"
    let uuid = localStorage.getItem(UuidKey)
    if (!uuid) {
        uuid = uuidv4()
        localStorage.setItem(UuidKey, uuid)
    }
    return uuid
}

export function setUserId(userId: string) {
    localStorage.setItem("userId", userId)
}