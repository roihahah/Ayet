const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const WebSocket = require('ws');
const http = require('http')

module.exports = {
    express,
    mongoose,
    dotenv,
    WebSocket,
    http
}