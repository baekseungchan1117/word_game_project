const express = require('express');
const cors = require('cors');
const axios = require('axios');
const xml2js = require('xml2js');
const path = require('path');


const apiKey = "810293DE9E772F6D2AD14A570BB9EF40"

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));


app.get('/search', async (req, res) => {
    const query = encodeURIComponent(req.query.q);
    const url1 = `http://opendict.korean.go.kr/api/search?key=${apiKey}&q=${query}&advanced=y&method=exact`;

    try {
        const response = await axios.get(url1);
        const xmlData = response.data;

        xml2js.parseString(xmlData, { explicitArray: false }, async (err, jsonData) => {
            if (err) {
                console.error("Failed to parse xml data:", err);
                return res.status(500).send(err.toString());
            }

            const total = parseInt(jsonData.channel.total, 10);

            if (total > 0) {
                const url2 = `http://opendict.korean.go.kr/api/search?key=${apiKey}&q=${query}&advanced=y&sort=popular&type1=word&method=start&num=100`;
                const response2 = await axios.get(url2);  // URL2를 사용하여 추가 데이터를 가져옴
                const xmlData2 = response2.data;

                xml2js.parseString(xmlData2, { explicitArray: false }, (err2, jsonData2) => {
                    if (err2) {
                        console.error("Failed to parse second xml data:", err2);
                        return res.status(500).send(err2.toString());
                    }

                    res.json({
                        userWordData: jsonData.channel,  // 첫 번째 요청의 데이터
                        computerWordData: jsonData2.channel  // 두 번째 요청 (URL2)의 데이터
                    });
                });
            } else {
                res.status(400).send('Invalid word');
            }
        });
    } catch (error) {
        console.error("Error occurred while fetching data:", error);
        res.status(500).send(error.toString());
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../clinet/build', 'index.html'));
  });


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});