// #region Deep Equality Helper

/**
 * Deep clone function that handles edge cases like dates and nested objects.
 * Note: Functions are not cloned, they are referenced from the original object.
 * Circular references are handled to prevent infinite loops.
 * @param obj Object to clone
 * @param visited WeakMap to track visited objects for circular reference detection
 * @returns Cloned object
 */
export function deepClone<T>(obj: T, visited = new WeakMap<object, unknown>()): T {
    // Handle primitives and null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle circular references
    if (visited.has(obj as object)) {
        return visited.get(obj as object) as T;
    }
    
    // Handle Date objects
    if (obj instanceof Date) {
        return new Date(obj.getTime()) as T;
    }
    
    // Handle RegExp objects
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags) as T;
    }
    
    // Handle Arrays
    if (Array.isArray(obj)) {
        const clonedArray: unknown[] = [];
        visited.set(obj as object, clonedArray);
        obj.forEach((item) => {
            clonedArray.push(deepClone(item, visited));
        });
        return clonedArray as T;
    }
    
    // Handle plain objects
    const clonedObj = {} as T;
    visited.set(obj as object, clonedObj);
    Object.keys(obj).forEach((key) => {
        (clonedObj as Record<string, unknown>)[key] = deepClone((obj as Record<string, unknown>)[key], visited);
    });
    
    return clonedObj;
}

/**
 * Deep equality comparison function that handles edge cases like dates, functions, 
 * undefined values, and circular references.
 * @param obj1 First object to compare
 * @param obj2 Second object to compare
 * @param visited Set to track visited objects for circular reference detection
 * @returns true if objects are deeply equal, false otherwise
 */
export function deepEqual(obj1: unknown, obj2: unknown, visited = new WeakMap<object, object>()): boolean {
    // Handle primitive types and null
    if (obj1 === obj2) return true;
    
    // Handle null and undefined cases
    if (obj1 == null || obj2 == null) return obj1 === obj2;
    
    // Handle different types
    if (typeof obj1 !== typeof obj2) return false;
    
    // Handle Date objects
    if (obj1 instanceof Date && obj2 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }
    
    // Handle RegExp objects
    if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
        return obj1.toString() === obj2.toString();
    }
    
    // Handle primitive types
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return obj1 === obj2;
    }
    
    // Handle circular references
    if (visited.has(obj1 as object)) {
        return visited.get(obj1 as object) === obj2;
    }
    visited.set(obj1 as object, obj2 as object);
    
    // Handle Arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) return false;
        return obj1.every((item, index) => deepEqual(item, obj2[index], visited));
    }
    
    // Handle plain objects
    const keys1 = Object.keys(obj1 as object);
    const keys2 = Object.keys(obj2 as object);
    
    if (keys1.length !== keys2.length) return false;
    
    return keys1.every(key => {
        const val1 = (obj1 as Record<string, unknown>)[key];
        const val2 = (obj2 as Record<string, unknown>)[key];
        return deepEqual(val1, val2, visited);
    });
}

// #endregion
