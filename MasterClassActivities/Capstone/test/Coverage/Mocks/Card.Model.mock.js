const cardMock = {
    findByPk: jest.fn().mockImplementation((id) => {
        if (id === 1) {
            return {
                id,
                color: "red",
                value: "5p",
                game_id: 2,
                update: jest.fn().mockImplementation(function (data) {
                    return Object.assign(this, data);
                }),
                destroy: jest.fn().mockResolvedValue(true)
            };
        }
        return null;
    }),
    findOne: jest.fn().mockImplementation(({ where }) => {
        if (where.id === 1) {
            return {
                id: 1,
                color: "red",
                value: "5p",
                game_id: 2,
                update: jest.fn().mockImplementation(function (data) {
                    return Object.assign(this, data);
                }),
                destroy: jest.fn().mockResolvedValue(true)
            };
        }
        return null;
    }),
    findAll: jest.fn().mockImplementation(() => {
        return [{
            id: 1,
            color: "red",
            value: "5p",
            game_id: 2,
            update: jest.fn().mockImplementation(function (data) {
                return Object.assign(this, data);
            }),
            destroy: jest.fn().mockResolvedValue(true)
        }];
    }),
    create: jest.fn().mockImplementation((data) => {
        return {
            id: 2,
            ...data,
            update: jest.fn().mockImplementation(function (data) {
                return Object.assign(this, data);
            }),
            destroy: jest.fn().mockResolvedValue(true)
        };
    })
};

export default cardMock;
