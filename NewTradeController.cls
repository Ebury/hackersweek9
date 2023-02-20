public class NewTradeController {
    @AuraEnabled
    public static Trade__c getNewTrade(Id recordId) {
        Trade__c newTrade = new Trade__c(Sell_Amount__c = 0, Sell_Currency__c = 'EUR',
                Buy_Amount__c = 0, Buy_Currency__c = 'EUR', Rate__c = 1);
        return newTrade;
    }

    @AuraEnabled
    public static Trade__c calculateRate(Trade__c trade) {
        trade.Rate__c =  ((Decimal)Math.random()).setScale(2);
        trade.Buy_Amount__c = trade.Sell_Amount__c * trade.Rate__c;
        return trade;
    }

    @AuraEnabled
    public static Boolean createTrade(Trade__c trade) {
        System.debug(trade);
        try{
            insert trade;
        } catch (Exception e) {
            return false;
        }
        return true;
    }
}