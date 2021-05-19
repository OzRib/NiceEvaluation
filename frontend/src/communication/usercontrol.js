export default function userControl({access, admin, error}){
    if(access==='granted'){
        if(admin===true){
            return {
                'action': 'admin',
                'error': null
            }
        }else{
            return {
                'action': 'user',
                'error': null
            }
        }
    }else{
        return {
            'action': 'error',
            'error': error
        }
    }
}