import express from 'express'
import { deletePlayer, getPlayerId, getPlayers, getUserProfile, loginPlayer, logoutPlayer, registerPlayer, updatePlayer } from '../Controllers/Player.Controller.js'
import { protect, validateExistPlayer, validateExistPlayerRegister } from '../../Business/middleware/player.middleware.js'

export const router = express.Router()


router.post('/register',validateExistPlayerRegister,registerPlayer);
router.post('/login',loginPlayer);
router.post('/logout', logoutPlayer);

router.use(protect);

router.get('/',getPlayers)
router.post('/profile',getUserProfile)
router
    .route('/:id')
    .get(validateExistPlayer,getPlayerId)
    .patch(validateExistPlayer,updatePlayer)
    .delete(validateExistPlayer,deletePlayer)
    .put(validateExistPlayer,updatePlayer)