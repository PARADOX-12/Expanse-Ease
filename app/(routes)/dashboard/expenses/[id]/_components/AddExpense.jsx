import React, {useState} from "react";
import { Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import {toast} from "sonner"


function AddExpenses({budgetId, user}){
    const[name, setName]=useState("")
    const[amount, setAmount]=useState("")

    const addNewExpense = async () => {
        try {
            const result = await db.insert(Expenses).values({
                name: name,
                amount: parseFloat(amount),
                budgetId: parseInt(budgetId),
                createdAt: new Date(),
                createdBy: user?.primaryEmailAddress?.emailAddress
            }).returning({insertedId:Expenses.id});

            console.log(result);
            if (result) {
                toast.success('New Expense Added!');
            }
        } catch (error) {
            console.error("Error adding new expense:", error);
            toast.error("Failed to add expense. Please try again.");
        }
    };


    return (
        <div>
            <h2 className="font-bold text-lg">Add Expenses</h2>
            <div className='mt-5'>
                        <h2 className='text-black font-medium my-1'>Expense Name</h2>
                        <Input placeholder="e.g. Bedroom Decor"
                        onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className='mt-2'>
                        <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                        <Input placeholder="e.g. 1000"
                        onChange={(e)=>setAmount(e.target.value)}/>
                    </div>
                <Button disabled={!(name&&amount)} 
                onClick={addNewExpense}className='mt-3'>Add New Expenses</Button>
            </div>
    )
    
}

export default AddExpenses