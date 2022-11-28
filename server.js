const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors")
const app = express();
const port = 9000;
const { uuid } = require("uuidv4");

// setup middleware
app.use(bodyParser.json());
app.use(cors());

//
var _dishes = [
    {
        id: "3b7a203e-bd24-4b08-b3eb-509b1de1102d",
        name: "Spaghetti Carbonara",
        shortDescription: "Feine Spaghetti mit Carbonara-Soße, der Klassiker aus Italien",
        priceInEuro: 12.00,
        dietCategories: [],
        category: "maincourse",
        availableMealtimes: ["lunch", "dinner"],
        availableDayCategory: "alldays",
        active: true,
        preparationTimeInMinutes: 15.00,
        _Created: new Date(Date.now() + Math.random()),
        _Changed: null
    },
    {
        id: "889f4ca1-025f-4c54-aee4-f967468e212f",
        name: "Cacio e Pepe",
        shortDescription: "Toskanische Pici mit Pecorino und schwarzem Pfeffer, zurück in der Toskana-Urlaub",
        priceInEuro: 14.00,
        dietCategories: ["vegetarisch"],
        category: "maincourse",
        availableMealtimes: ["lunch", "dinner"],
        availableDayCategory: "weekdays",
        active: true,
        preparationTimeInMinutes: 15.00,
        _Created: new Date(Date.now() + Math.random()),
        _Changed: null
    },
    {
        id: "f1df6b4b-1213-4665-a97e-02602a8c33f6",
        name: "Profiteroles",
        shortDescription: "Feinste Windbeutelchen in dunkler Schokoladensoße",
        priceInEuro: 7.00,
        dietCategories: ["vegetarisch"],
        category: "dessert",
        availableMealtimes: ["lunch", "dinner"],
        availableOnDayCategories: "alldays",
        active: true,
        preparationTimeInMinutes: 5.00,
        _Created: new Date(Date.now() + Math.random()),
        _Changed: null
    },
    {
        id: "d470760e-4f1c-4115-9e90-b9f753a710a8",
        name: "Pannacotta",
        shortDescription: "Pannacotta mit echter Bourbon-Vanille garniert mit Waldfrüchten",
        priceInEuro: 7.50,
        dietCategories: ["glutenfrei"],
        category: "dessert",
        availableMealtimes: ["lunch", "dinner"],
        availableDayCategory: "alldays",
        active: true,
        preparationTimeInMinutes: 5.00,
        _Created: new Date(Date.now() + Math.random()),
        _Changed: null
    },
    {
        id: "efc74e7d-b5b5-4782-933b-6df01601aa37",
        name: "Saltimbocca",
        shortDescription: "Saltimbocca heißt \"Spring in den Mund\" und bezeichnet einen italienischen Küchenklassiker aus feinem Kalbfleisch, luftgetrocknetem Schinken und Salbeiblättern.",
        priceInEuro: 18.00,
        dietCategories: ["glutenfrei"],
        category: "maincourse",
        availableMealtimes: ["dinner"],
        availableDayCategory: "alldays",
        active: true,
        preparationTimeInMinutes: 18.00,
        _Created: new Date(Date.now() + Math.random()),
        _Changed: null
    },
    {
        id: "79ce5d98-10d1-4818-ad91-659abfed7895",
        name: "Zuppa di Pesce",
        shortDescription: "Italienische Fischsuppe mit Riesengarnelen, Muscheln und Kabeljau.",
        priceInEuro: 24.00,
        dietCategories: ["laktosefrei", "glutenfrei"],
        category: "maincourse",
        availableMealtimes: ["dinner"],
        availableDayCategory: "weekends",
        active: true,
        preparationTimeInMinutes: 18.00,
        _Created: new Date(Date.now() + Math.random()),
        _Changed: null
    },
    {
        id: "3fd63dca-2863-418b-a599-47d3ee455742",
        name: "Insalata Caprese",
        shortDescription: "Frische Tomate und Büffelmozzarella mit Basilikum",
        priceInEuro: 7.00,
        dietCategories: ["vegetarisch", "glutenfrei"],
        category: "starter",
        availableMealtimes: ["lunch", "dinner"],
        availableDayCategory: "alldays",
        active: true,
        preparationTimeInMinutes: 10.00,
        _Created: new Date(Date.now() + Math.random()),
        _Changed: null
    },
    {
        id: "80a26899-9984-4d3f-863c-22fbadb0eeec",
        name: "Vitello Tonnato",
        shortDescription: "Hauchdünn geschnittenes Kalbsfilet mit einer Soße aus Thunfisch, Kapern und Ei.",
        priceInEuro: 12.00,
        category: "starter",
        availableMealtimes: ["dinner"],
        availableDayCategory: "weekends",
        active: true,
        preparationTimeInMinutes: 8.00,
        _Created: new Date(Date.now() + Math.random()),
        _Changed: null
    },
];

// get dishes
router.get('/dishes', (req, res) => {
    res.json({
        status: "OK",
        data: _dishes
    });
});

// clear dishes
router.get('/dishes/clear', (req, res) => {
    _dishes = [];
    
    res.json({
        status: "OK"
    });
});

// get dish by id
router.get('/dishes/:id', (req, res) => {
    const dish = _dishes.find(x => x.id === req.params.id);

    res.json({
        status: "OK",
        data: dish ? dish : null
    });
});

// insert/update dish
router.put('/dishes', (req, res) => {
    if (req.body == null) {
        res.json({
            status: "Failed",
            message: "No content provided"
        });
    }
    else {
        let dish = req.body,
            status = "OK";
        
        if (!dish.id) {
            //
            dish.id = uuid();
            dish._Created = new Date();
            dish._Changed = null;

            //
            _dishes.push(dish);
        }
        else {
            //
            const dishIndex = _dishes.findIndex(x => x.id === dish.id);

            //
            if (dishIndex >= 0) {
                //
                dish._Changed = new Date();

                //
                _dishes[dishIndex] = dish;
            }
            else {
                //
                status = `dish not found for id ${dish.id}`;
            }
        }

        res.json({
            status: status,
            data: dish
        });
    }
});

// delete dish
router.delete('/dishes/:id', (req, res) => {
    let dishIndex = _dishes.findIndex(x => x.id === req.params.id);

    if (dishIndex !== -1) {
        _dishes.splice(dishIndex, 1);
    }

    res.json({
        status: "OK",
        message: dishIndex !== -1 ? "Dish deleted" : "Dish not found"
    });
});


//
app.use(router);

//
app.listen(port, () => {
    console.log(`api is ready on http://localhost:${port}`)
});