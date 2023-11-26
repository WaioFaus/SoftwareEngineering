import {faker} from '@faker-js/faker'
import { PrismaClient } from '@prisma/client';
import 'crypto-js';

const prisma = new PrismaClient();

async function main(){
    Array.from({length: 30}).map(async (_,i)=>{
        await prisma.user.create({
            data: {
                username: faker.company.name(),
                email: faker.internet.email(),
                password: '123'
            },
        });
    });

    Array.from({length: 30}).map(async (_,i)=>{
        await prisma.user.create({
            data: {
                username: faker.company.name(),
                email: faker.internet.email(),
                password: '123',
                isVendor: true
            },
        });
    });

    //const vendor = await prisma.vendor.findMany();
    //console.log(vendor);
    
    var sizes = ['S', 'M', 'L'];
    var vendors = await prisma.user.findMany({
        where:{
            isVendor: {
                equals: true
            }
        }
    });
    Array.from({length: 30}).map(async (_,i)=>{
        await prisma.product.create({
            data: {
                title: faker.commerce.productName(),
                color:  faker.color.human(),
                price: parseInt(faker.commerce.price()),
                size: sizes[Math.floor(Math.random() * 3)],
                desc: "",
                img: "",
                vendorId: vendors[Math.floor(Math.random() * 30)].UserId,
            },
        });
    });

    console.log('done');
}

main();