import {CognitoUserPool} from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: 'us-east-1_cK8NQgIyZ',
  ClientId: '6duo28ans74kakek9mmgumia0n'
}

export const userPool = new CognitoUserPool(poolData)