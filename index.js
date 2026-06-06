#!/usr/bin/env node
const {Command} = require('commander');
const readline = require('readline');
const program = new Command();
const screen = require('screenshot-desktop');
const os = require('node:os');
const fs = require('node:fs');
const filePath = './systemData.json';
program
    .name('js')
    .version('1.0.0')
    .description('This is my first Command Line for me')
// for hello 
program
    .command('hello')
    .alias('h')
    .description('Say hello ')
    .action(()=>{
        console.log('Hello Joseph In your World')
    
})

program 
    .command('time')
    .alias('t')
    .description('get full time')
    .action((answer) =>{
        const date = new Date();
        console.log(date.toLocaleDateString())
        console.log(date.getHours(),":",date.getMinutes())
})

program
    .command('repeat')
    .alias('R')
    .description('this is for repeat your text 10 or 100 moment')
    .argument("<text>", "add your text repeat")
    .argument('<repeat>', "you ready for repeat the Text")
    .action((answer, option)=>{
        console.log("\n ", answer.repeat(Number(option)), " \n")
    })
program
    .command('computer')
    .alias('C')
    .description('this is for done your analyse your computer')
    .action((answer)=>{
        const data = [{
            Total_RAM: (os.totalmem()/1024/1024/1024).toFixed(2) + "GB",
            Free_RAM: (os.freemem()/1024/1024/1024).toFixed(2) + "GB",
            Home: os.homedir(),
            Name: os.hostname(),
            CPU_Lenght: os.cpus().length,
            Start: (os.uptime()/3600).toFixed(2) + " H",
            ARCH: os.arch(),
            User_Info: os.userInfo()
        }]
        const dataFile = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        dataFile.question('I can create new file have this data |ok|', (ans)=>{
            if(ans === 'ok' || ans === 'yes'){
                if(fs.existsSync(filePath)){
                    fs.readFile(filePath, 'utf8', (err, content)=>{
                        if(err) {
                            console.log(err);
                            process.exit()
                        }else{
                            const fileArray = JSON.parse(content)
                            fileArray.push(answer)
                            fs.writeFile(filePath, JSON.stringify(fileArray),'utf8', (err)=>{
                            if(err){console.log('Its Error', err)}
                            console.log(data)
                            console.log('Fineshed creat the file system Data')
                            })
                        }
                    })
                }else{
                   fs.writeFile(filePath, JSON.stringify(data),'utf8', (err)=>{
                    if(err){console.log('Its Error', err)}
                    console.log(data)
                    console.log('Fineshed creat the file system Data')
                    }) 
                }
                
            }else{
                console.log(data)
            }
            dataFile.close()
        })

    })

program
    .command('ask')
    .alias('A')
    .description('Ask user question')
    .action((answer)=>{
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl.question("What is your name? ", (name)=>{
            rl.question('How old are you? ', (age)=>{
                rl.question('what is your best language? ', (language)=>{
                    rl.question('What is your niveau Student? ',(nv)=>{
                        rl.question('Are you ready for look in your result |yes| OR |no|? ', (ready)=>{
                            if(ready === 'yes' || ready === "YES"){
                                console.log(`Hello ${name}, you are ${age} old years, your best language is ${language}, and your niveau is ${nv}`)
                            }else if(ready === "no" || ready === "NO"){
                                rl.question('This is your last question\n Are you ready ?', (rd)=>{
                                console.log(`Hello ${name}, you are ${age} old years, your best language is ${language}, and your niveau is ${nv}`)      
                                rl.close()
                            })
                            }else{
                                console.log(`Hello ${name}, you are ${age} old years, your best language is ${language}, and your niveau is ${nv}`)
                            }
                        })
                    })
                })
            })
        })
    })
program
    .command('operatin')
    .alias('OP')
    .description('here you can operation')
    .action((answer)=>{
        const oper = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        oper.question('What is your operation |/| |*| |-| |+|? ', (operation)=>{
            oper.question('What is your first number', (num1)=>{
                oper.question('What is your second number', (num2)=>{
                    if(operation == '+'){
                        console.log('your result is : \n')
                        console.log(`${num1} ${operation} ${num2} = `, Number(num1) + Number(num2))
                    }else if( operation == '-'){
                        console.log(`${num1} ${operation} ${num2} = `, Number(num1) - Number(num2))
                    
                    }else if( operation == '/'){
                        console.log(`${num1} ${operation} ${num2} = `, Number(num1) / Number(num2))
                    
                    }else if( operation == '*'){
                        console.log(`${num1} ${operation} ${num2} = `, Number(num1) * Number(num2))
                    }
                    else{
                        console.log("no I don't have this operation")
                    }
                    oper.close()
                })
            })
        })
      
    })

program
    .command("screen")
    .alias('s')
    .description('here looking your images')
    .action(()=>{
        screen().then((img)=>{
            fs.writeFile('screenshot.jpg', img, (err)=>{
                if(err){
                    console.log('Its Error', err)
                    process.exit();
                }
                console.log('Fineshed creat the file screenshot')
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

)



program.parse(process.argv)