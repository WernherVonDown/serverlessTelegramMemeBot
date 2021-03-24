const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient
            .get(params)
            .promise()

        if (!data || !data.Item) {
            console.log(`Error getting data by ID = ${ID} from ${TableName}`);
            return null;
        }

        return data.Item;
    },

    async write(data, TableName) {
        if (!data.ID) {
            console.log('No ID in data');
            return;
        }

        const params = {
            TableName,
            Item: data
        }

        const res = await documentClient.put(params).promise();

        if (!res) {
            console.log(`Error writing in DB params=${params}`);
            return;
        }

        return data;
    },

    async update(data) {
        return documentClient.update(data).promise();
    },

    async scanTable(tableName) {
        const params = {
            TableName: tableName,
        };

        const scanResults = [];
        let items;
        do {
            items = await documentClient.scan(params).promise();
            items.Items.forEach((item) => scanResults.push(item));
            params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey !== "undefined");

        return scanResults;
    },

    async delete(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        };
        return documentClient.delete(params).promise();
    }
}

module.exports = Dynamo;