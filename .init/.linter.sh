#!/bin/bash
cd /home/kavia/workspace/code-generation/bike-taxi-booking-system-26587-26596/bike_taxi_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

