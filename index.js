import express from "express"
import passport from "passport"
import {OAuth2Strategy} from "passport-oauth"
import User from "./db/user.js"
import Deals from "./db/deals.js"
import Mapper from "./mappers/mapper.js"
import {fileURLToPath} from 'url';
import * as path from "path";
import multer from "multer";
import api from "./api/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;
const upload = multer()
let currentUserId = null;

User.createTable();
Deals.createTable();

passport.use(
    "pipedrive",
    new OAuth2Strategy(
        {
            authorizationURL: "https://oauth.pipedrive.com/oauth/authorize",
            tokenURL: "https://oauth.pipedrive.com/oauth/token",
            clientID: process.env.CLIENT_ID || "",
            clientSecret: process.env.CLIENT_SECRET || "",
            callbackURL: process.env.CALLBACK_URL || "",

        },
        async (accessToken, refreshToken, profile, done) => {
            const userInfo = await api.getUser(accessToken);
            currentUserId = userInfo.data.id
            const user = await User.add(
                userInfo.data.name,
                userInfo.data.id,
                accessToken,
                refreshToken
            );
            done(null, {user});
        }
    )
);
app.disable("x-powered-by");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(async (req, res, next) => {
    req.user = await User.getById(currentUserId);
    next();
});


app.get("/auth/pipedrive", passport.authenticate("pipedrive"))
app.get(
    "/auth/pipedrive/callback",
    passport.authenticate("pipedrive", {
        session: false,
        failureRedirect: "/",
        successRedirect: "/",
    })
);


app.get("/", (req, res) => {
    if (!req.user) {
        return res.redirect("/auth/pipedrive");
    }

    res.render("deals");
});

app.post("/", upload.any(), async (req, res) => {
    if (!req.user) {
        return res.redirect("/auth/pipedrive");
    }

    const newTitle = "Job # " + Date.parse(new Date())
    const deal = req.body
    try {

        const user = await User.getById(req.query.userId)
        const newDeal = await api.addDeal(newTitle, user.access_token);

        await Deals.addDeal({...deal, userId: newDeal.data.user_id.id, dealId: newDeal.data.id})

        await api.addNote(`New Job was created ${newTitle}`, newDeal.data.id, user.access_token)

        return res.render("outcome", {dealTitle: newDeal.data.title, newDealId: newDeal.data.id});

    } catch (error) {
        console.log(error);
        return res.send("Failed to add new deal");
    }

})

app.get("/details", async (req, res) => {
    if (!req.user) {
        return res.redirect("/auth/pipedrive");
    }

    const dealId = Number(req.query.selectedIds)
    const userId = Number(req.query.userId)

    try {
        const deal = await Deals.getDealByIds(userId, dealId)
        const dealDetails = Mapper.mapDeal(deal)

        res.render("dealDetails", {deal: dealDetails});
    } catch (error) {
        console.log(error);
        return res.send("Failed to get deal");
    }
});


app.listen(port, () => console.log(`App listening on port ${port}`));
