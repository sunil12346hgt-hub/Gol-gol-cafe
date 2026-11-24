GOL GOL CAFE - ORDERING WEBSITE

यह तैयार starter project है:
- Customer menu + cart + checkout
- Orders server पर orders.json में save होते हैं
- Admin dashboard password से खुलता है
- Admin हर 5 सेकंड में नए orders देखता है और status बदल सकता है

चलाने के लिए:
1. Replit में Node.js project बनाएं और इस ZIP की सारी files upload करें.
2. Shell में npm install चलाएं.
3. Replit Secrets में ADMIN_PASSWORD नाम से अपना मजबूत password रखें.
4. Run दबाएं.
5. वेबसाइट का public URL मिलने के बाद उसी URL का QR बनाएं.

महत्वपूर्ण:
- अभी menu में sample items/prices हैं; इन्हें अपने असली menu के अनुसार बदलें.
- यह starter single-server JSON storage उपयोग करता है. बड़े/production कारोबार के लिए managed database जोड़ना बेहतर है.
- अभी कोई QR image शामिल नहीं है, क्योंकि QR में डालने के लिए deployed public website URL चाहिए. बिना URL का QR ग्राहक को आपकी साइट पर नहीं ले जा सकता.
- Admin password को source code में न रखें; host के Secrets/Environment Variables में रखें.
