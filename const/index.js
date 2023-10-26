module.exports = {
    minLenght: (character) => {
        if (character == 1) {
            return `This field must have at least ${character} character`;
        } else if (character > 1) {
            return `This field must have at least ${character} characters`;
        }
    },

    maxLenght: (character) => {
        if (character == 1) {
            return `This field must have a maximum of ${character} character`;
        } else if (character > 1) {
            return `This field must have a maximum of ${character} characters`;
        }
    },

    required: () => {
        return `This value is required`;
    }
}