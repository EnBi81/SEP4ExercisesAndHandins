#include "account.h"
#include "stdlib.h"

typedef struct account {
    int accountNo;
    double creditLimit;
    double balance;
} account;


account_t account_create(int accountNo, double creditLimit){
    account* acc = malloc(sizeof(account));

    acc->accountNo = accountNo;
    acc->creditLimit = creditLimit;
    acc->balance = 0;
}

void account_destroy(account_t acc){
    if(acc != NULL){
        free(acc);
    }
}

account_status account_withdraw(account_t acc, double amount){
    if(acc == NULL){
        return ACCOUNT_NOT_INSTANTIATED;
    }

    double newBalance = acc->balance - amount;
    if(newBalance < -acc->creditLimit){
        return OVER_MAX_CREDIT_LIMIT;
    }

    acc->balance = newBalance;
    return OK;
}

account_status account_deposit(account_t acc, double amount){
    if(acc == NULL){
        return ACCOUNT_NOT_INSTANTIATED;
    }

    acc->balance += amount;

    return OK;
}


double account_get_balance(account_t acc){
    return acc->balance;
}

double account_get_credit_limit(account_t acc){
    return acc->creditLimit;
}

int account_get_account_no(account_t acc){
    return acc->accountNo;
}