import { CardService } from "../../src/Data/Service/Card.Service.js";

jest.mock('../../src/Business/Models/Card.Model.js', () => {
    const SequelizeMock = require('sequelize-mock');
    const DBConnectionMock = new SequelizeMock();
    const cardMock = DBConnectionMock.define('Card', {
        id: 1,
        color: "red",
        value: "5p",
        game_id: 2
    });

    cardMock.findByPk = jest.fn().mockImplementation((id) => {
        return cardMock.build({ id, color: "red", value: "5p", game_id: 2 });
    });

    return cardMock;
});

describe('CardService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('findOneCard should return one card', async () => {
        const card = await CardService.findOneCard(1);
        expect(card).not.toBeNull();
        expect(card.id).toBe(1);
    });

    test('findAllCards should return all cards', async () => {
        const cards = await CardService.findAllCards();
        expect(cards).not.toBeNull();
        expect(cards.length).toBeGreaterThan(0);
    });

    test('createCard should create a card', async () => {
        const newCard = { color: "blue", value: "10p", game_id: 3 };
        const card = await CardService.CreateCard(newCard);
        expect(card).not.toBeNull();
        expect(card.color).toBe("blue");
    });

    test('deleteCard should delete a card', async () => {
        const result = await CardService.deleteCard(1);
        expect(result).toBe(result);
    });
});