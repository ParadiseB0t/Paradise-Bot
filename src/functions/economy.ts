import { Interaction } from "discord.js";
import economySchema from "../models/economy-schema"
import economySwitchSchema from "../models/economy-switch-schema"
import { MessageEmbed } from "discord.js";
let embed 

class Economy {
                                                //ALL CHECKING FUNCTIONS UNDER HERE

    //Checks if they have a schema saved
    async accCheck(userId: any, guildId: any) {
      const check: any = await  economySchema.find({ userId });
      if (check.length === 0) {
        return false
      } else {
        return true
      }
      
    }

    //Checks if they have a guild account for that guild
    async guildCheck(userId: any, guildId: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = check[0].guildEco.filter((x: any) => x.guildId === guildId)
      if (finalResult.length === 0) {
        return false
      } else {
        return true
      }
    }

    //Checks if the guild has global on or off
    async check(guildId: any) {
        const check: any = await  economySwitchSchema.find({ guildId });
        if(check.length === 0) {
          await economySwitchSchema.create({
            guildId: guildId,
            trueOrFalse: true
          })
          return('Failed')
        }
        const finalResult = check[0].trueOrFalse
        return finalResult
    }
    
                                                  //ALL ACCOUNT MAKING FUNCTIONS UNDER HERE
    
    //Makes a user a global account
    async globalNewUser(userId: any, guildId: any) {
      const newUser = new economySchema({
        userId: userId,
        globalBalance: 0,
        globalBank: 0,
        globalDaily: false,
        guildEco: [],
      })
      await newUser.save()
    }

    //Makes a user a guild account
    async guildNewUser(userId: any, guildId: any) {
      await economySchema.updateOne({ userId }, { $push: { guildEco: { guildId: (guildId as String), guildBalance: 0, guildBank: 0, guildDaily: false } } })
    }

                                                  //ALL GLOBAL FUNCTIONS UNDER HERE

    //Pays into global balance
    async globalPay(userId: any, amount: any) {
        const check: any = await  economySchema.find({ userId });
        const finalResult = check[0].globalBalance + amount
        await economySchema.updateOne({ userId }, { globalBalance: finalResult })
        return finalResult
    }

    //Sets a persons global balance
    async globalSet(userId: any, amount: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = amount
      await economySchema.updateOne({ userId }, { globalBalance: finalResult })
      return finalResult
    }

    //Checks a persons global balance and returns it
    async globalBalance(userId: any) {
        const check: any = await  economySchema.find({ userId });
        const finalResult = check[0].globalBalance
        return finalResult
    }

    //Checks a persons global bank and returns it
    async globalBank(userId: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = check[0].globalBank
      return finalResult
    }

    //Checkes if they have already claimed their global daily
    async checkGlobalDaily(userId: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = check[0].globalDaily
      return finalResult
    }

    //Sets a specific persons daily boolean 
    async setGlobalDaily(userId: any, trueOrFalse: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = trueOrFalse
      await economySchema.updateOne({ userId }, { daily: finalResult })
      return finalResult
    }

    //Sets the daily boolean for the global
    async setAllGlobalDaily(trueOrFalse: any) {
      const check: any = await  economySchema.find({});
      const finalResult = trueOrFalse
      await economySchema.updateMany({}, { daily: finalResult })
      return finalResult
    }

    //Takes money from their global balance
    async takeGlobal(userId: any, amount: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = check[0].globalBalance - amount
      await economySchema.updateOne({ userId }, { globalBalance: finalResult })
      return finalResult
    }

    //Deposit a chosen amount into their global bank and take that amount away from their wallet
    async globalDeposit(userId: any, amount: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = check[0].globalBank + amount
      await economySchema.updateOne({ userId }, { globalBank: finalResult })
      const finalResult2 = check[0].globalBalance - amount
      await economySchema.updateOne({ userId }, { globalBalance: finalResult2 })
      return finalResult
    }
    //Witdraw a chosen amount into their global wallet and subtract that amount away from their bank
    async globalWithdraw(userId: any, amount: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = check[0].globalBank - amount
      await economySchema.updateOne({ userId }, { globalBank: finalResult })
      const finalResult2 = check[0].globalBalance + amount
      await economySchema.updateOne({ userId }, { globalBalance: finalResult2 })
      return finalResult
    }

                                                        //ALL GAME FUNCTIONS UNDER HERE

    //Slots game
    async slots(userId: any, amount: any) {
      const randomNumber = Math.floor(Math.random() * 2)
      if (randomNumber === 1) {
        const check: any = await  economySchema.find({ userId });
        const finalResult = check[0].globalBalance + amount
        await economySchema.updateOne({ userId }, { globalBalance: finalResult })
        return true
      } else {
        const check: any = await  economySchema.find({ userId });
        const finalResult = check[0].globalBalance - amount
        await economySchema.updateOne({ userId }, { globalBalance: finalResult })
        return false
      }
    }

                                                                  //ALL GUILD FUNCTIONS UNDER HERE

    //Finds the users balance for that guild
    async guildBalance(userId: any, guildId: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = check[0].guildEco.filter((x: any) => x.guildId === guildId)[0].guildBalance
      return finalResult
    }

    //Adds to the users balance for that guild
    async guildPay(userId: any, guildId: any, amount: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = check[0].guildEco.filter((x: any) => x.guildId === guildId)[0].guildBalance + amount
      await economySchema.findOneAndUpdate({ "guildEco.guildId": guildId }, { $set: { "guildEco.$.guildBalance": finalResult } })
      return finalResult
    }

    //Sets the users balance for that guild
    async guildSet(userId: any, guildId: any, amount: any) {
      const check: any = await  economySchema.find({ userId });
      await economySchema.findOneAndUpdate({ "guildEco.guildId": guildId }, { $set: { "guildEco.$.guildBalance": amount } })
    }

    //Sets someone servers daily boolean
    async setGuildDaily(userId: any, guildId: any, trueOrFalse: any) {
      const check: any = await  economySchema.find({ userId });
      await economySchema.findOneAndUpdate({ "guildEco.guildId": guildId }, { $set: { "guildEco.$.guildDaily": trueOrFalse } })
      return trueOrFalse
    }

    //Checks a persons guild bank and returns it
    async guildBank(userId: any, guildId: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = check[0].guildEco.filter((x: any) => x.guildId === guildId)[0].guildBank
      return finalResult
    }

    //Deposit a chosen amount into their guild bank and take that amount away from their wallet
    async guildDeposit(userId: any, guildId: any, amount: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = check[0].guildEco.filter((x: any) => x.guildId === guildId)[0].guildBank + amount
      await economySchema.findOneAndUpdate({ "guildEco.guildId": guildId }, { $set: { "guildEco.$.guildBank": finalResult } })
      const finalResult2 = check[0].guildEco.filter((x: any) => x.guildId === guildId)[0].guildBalance - amount
      await economySchema.findOneAndUpdate({ "guildEco.guildId": guildId }, { $set: { "guildEco.$.guildBalance": finalResult2 } })
      return finalResult
    }
    //Withdraw a chosen amount into their guild wallet and subtract that amount away from their guild bank
    async guildWithdraw(userId: any, guildId: any, amount: any) {
      const check: any = await  economySchema.find({ userId });
      const finalResult = check[0].guildEco.filter((x: any) => x.guildId === guildId)[0].guildBank - amount
      await economySchema.findOneAndUpdate({ "guildEco.guildId": guildId }, { $set: { "guildEco.$.guildBank": finalResult } })
      const finalResult2 = check[0].guildEco.filter((x: any) => x.guildId === guildId)[0].guildBalance + amount
      await economySchema.findOneAndUpdate({ "guildEco.guildId": guildId }, { $set: { "guildEco.$.guildBalance": finalResult2 } })
      return finalResult
    }
}

export default Economy