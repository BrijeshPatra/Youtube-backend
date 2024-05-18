import { Router } from "express"
import express from express


Router.post('/register',register)
Router.post('/login',login)

module.exports=Router