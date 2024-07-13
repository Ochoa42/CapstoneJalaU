/**
 * Function to handle nested objects and ensure immutability
 * @param {Object} obj - The original object
 * @param {Object} updates - An object containing the updates to be applied
 * @returns {Object} - A new object with the updates applied
 */
function handleNestedObject(obj, updates) {
    function deepMerge(target, source) {
        if (typeof target !== 'object' || target === null) {
            return source;
        }
        if (typeof source !== 'object' || source === null) {
            return source;
        }
        const merged = { ...target };
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                merged[key] = deepMerge(target[key], source[key]);
            }
        }
        return merged;
    }
    return deepMerge(obj, updates);
}

let userProfile = {
    id: 1,
    name: "John Doe",
    address: {
        street: "123 Main St",
        city: "Anytown",
        zip: "12345"
    },
    hobbies: ["Reading", "Hiking"],
    social: {
        twitter: "@johndoe",
        facebook: "johndoe123"
    }
};

const updatedProfile = handleNestedObject(userProfile, {
    address: {
        city: "New City"
    },
    social: {
        facebook: "updatedFacebook"
    }
});

console.log(updatedProfile);
// Output:
// {
//     id: 1,
//     name: "John Doe",
//     address: {
//         street: "123 Main St",
//         city: "New City",
//         zip: "12345"
//     },
//     hobbies: ["Reading", "Hiking"],
//     social: {
//         twitter: "@johndoe",
//         facebook: "updatedFacebook"
//     }
// }

console.log(userProfile);
// Output (original userProfile remains unchanged):
// {
//     id: 1,
//     name: "John Doe",
//     address: {
//         street: "123 Main St",
//         city: "Anytown",
//         zip: "12345"
//     },
//     hobbies: ["Reading", "Hiking"],
//     social: {
//         twitter: "@johndoe",
//         facebook: "johndoe123"
//     }
// }